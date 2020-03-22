const graphql = require("graphql");

// =============== Models =================
const Role = require("../../models/role");
const Course = require("../../models/course");
const User = require("../../models/user");

const { GraphQLString, GraphQLList, GraphQLID, GraphQLObjectType } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    fullname: { type: GraphQLString },
    email: { type: GraphQLString },
    avatar: { type: GraphQLString },
    bio: { type: GraphQLString },
    created_at: { type: GraphQLString },
    role: {
      type: RoleType,
      resolve(parent, args) {
        return Role.findOne({ title: parent.role });
      }
    },
    courses: {
      type: new GraphQLList(CourseType),
      resolve: async (parent, args) => {
        return await Course.find({ owner_id: parent.id });
      }
    }
  })
});

module.exports = UserType;
const RoleType = require("./role-type");
const CourseType = require("./course-type");
