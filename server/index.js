const express = require("express");
const graphqlHTTP = require("express-graphql");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const schema = require("./schema/schema");
const fileUpload = require("express-fileupload");
const sanitize = require("sanitize-filename");

// =====================================  Models ===================================
const User = require("./models/user");
const Course = require("./models/course");

require("dotenv").config();
const app = express();
const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  SERVER_IP,
  PORT,
  PRIVATE_KEY
} = process.env;

// =====================================  Middleware ===================================

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors("*"));
app.use(cookieParser());
app.use(express.static("public"));
app.use(function(req, res, next) {
  res.header("X-XSS-Protection", 0);
  next();
});
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(fileUpload());

// =================================  Authentication Midlleware =======================
const isAuth = (req, res, next) => {
  const token = req.headers["authorization" || ""];

  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, PRIVATE_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("invalid token");
  }
};

// =============================== End Authentication Midlleware =======================
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(400).json({ message: "Invalid email or password" });
    } else {
      const token = jwt.sign(
        { email, id: user._id, fullname: user.fullname, role: user.role },
        PRIVATE_KEY
      );
      res.json({ token: token });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/image-upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "no file uploaded" });
  }

  const file = req.files.file;
  console.log(file.name.replace(/ /g, "-").toLowerCase());

  file.mv(
    `${__dirname}/public/uploads/${file.name.replace(/ /g, "-").toLowerCase()}`,
    err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    }
  );
});

app.use(
  "/admin",
  // isAuth,
  graphqlHTTP({
    schema,
    graphiql: true,
    customFormatErrorFn: err => {
      return err.message;
    }
  })
);

mongoose.connect(MONGO_URL, function(err, client) {
  if (err) {
    console.log(err);
  }
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
