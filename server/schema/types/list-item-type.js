const graphql = require("graphql");
const Course = require("../../models/course");

const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLFloat,
  GraphQLInt
} = graphql;

const ListItemType = new GraphQLObjectType({
  name: "ListItem",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    course_id: { type: GraphQLID },
    title: { type: GraphQLString },
    type: { type: GraphQLString },
    section: { type: GraphQLInt },
    point: { type: GraphQLInt },
    preview: { type: GraphQLBoolean },
    description: { type: GraphQLString },
    course: {
      type: CourseType,
      resolve: async (parent, args) => {
        return Course.findOne({ _id: parent.course_id });
      }
    }
  })
});

module.exports = ListItemType;

const CourseType = require("./course-type");
