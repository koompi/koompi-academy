const graphql = require("graphql");
const Category = require("../../models/category");
const User = require("../../models/user");
const Question = require("../../models/question");
const Rate = require("../../models/rate");

const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLFloat,
  GraphQLInt
} = graphql;

const CourseType = new GraphQLObjectType({
  name: "Couses",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    feature_image: {
      type: GraphQLString
    },
    status: {
      type: GraphQLString
    },
    tags: {
      type: new GraphQLList(GraphQLString)
    },
    price: {
      type: GraphQLFloat
    },
    description: {
      type: GraphQLString
    },
    created_at: {
      type: GraphQLString
    },
    category_name: {
      type: GraphQLString
    },
    owner_id: {
      type: GraphQLID
    },
    category: {
      type: CategoryType,
      resolve: async (parent, args) => {
        return Category.findOne({ title: parent.category_name });
      }
    },
    user: {
      type: UserType,
      resolve: async (parent, args) => {
        return User.findOne({ _id: parent.owner_id });
      }
    },
    questions: {
      type: new GraphQLList(QuestionType),
      resolve(parent, args) {
        return Question.find({ course_id: parent.id });
      }
    },
    rates: {
      type: new GraphQLList(RateType),
      resolve: async (parent, args) => {
        return Rate.find({ course_id: parent.id });
      }
    }
  })
});

module.exports = CourseType;

const UserType = require("./user-type");
const CategoryType = require("./category-type");
const QuestionType = require("./question-type");
const RateType = require("./rate-type");
