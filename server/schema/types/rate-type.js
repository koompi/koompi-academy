const graphql = require("graphql");
const User = require("../../models/user");
const Course = require("../../models/course");

const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql;

const RateType = new GraphQLObjectType({
  name: "Rate",
  fields: () => ({
    course_id: { type: GraphQLID },
    score: { type: GraphQLInt },
    comment: { type: GraphQLString },
    user_id: { type: GraphQLID },
    user: {
      type: UserType,
      resolve: async (parent, value) => {
        return User.findOne({ _id: parent.user_id });
      }
    },
    course: {
      type: CourseType,
      resolve: async (parent, value) => {
        return Course.findOne({ _id: parent.course_id });
      }
    }
  })
});

module.exports = RateType;

const UserType = require("./user-type");
const CourseType = require("./course-type");
