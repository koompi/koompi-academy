const graphql = require("graphql");
const User = require("../../models/user");
const Course = require("../../models/course");

const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;

const CategoryType = new GraphQLObjectType({
  name: "Categories",
  fields: () => ({
    id: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    created_at: {
      type: GraphQLString
    },
    user: {
      type: UserType,
      resolve: async (parent, value) => {
        return User.findOne({ _id: parent.user_id });
      }
    },
    courses: {
      type: new GraphQLList(CourseType),
      resolve: async (parent, args) => {
        return await Course.find({ id: parent.category_id });
      }
    }
  })
});

module.exports = CategoryType;

const UserType = require("./user-type");
const CourseType = require("./course-type");
