const graphql = require("graphql");
const Course = require("../../models/course");
const Point = require("../../models/point");

const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql;

const SectionType = new GraphQLObjectType({
  name: "Section",
  fields: () => ({
    id: {
      type: GraphQLString
    },
    course_id: {
      type: GraphQLID
    },
    no: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    message: {
      type: GraphQLString
    },
    course: {
      type: CourseType,
      resolve: async (parent, value) => {
        return Course.findOne({ _id: parent.course_id });
      }
    },
    points: {
      type: new GraphQLList(PointType),
      resolve: async (parent, args) =>
        await Point.find({ section_id: parent.id })
    }
  })
});

module.exports = SectionType;
const PointType = require("./point-type");
const CourseType = require("./course-type");
