const graphql = require("graphql");
const Section = require("../../models/section");

const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql;

const PointType = new GraphQLObjectType({
  name: "Point",
  fields: () => ({
    id: {
      type: GraphQLString
    },
    no: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    video_link: {
      type: GraphQLString
    },
    preview: {
      type: GraphQLBoolean
    },
    section_id: {
      type: GraphQLID
    },
    section: {
      type: SectionType,
      resolve: async (parent, value) => {
        return Section.findOne({ _id: parent.section_id });
      }
    },
    message: {
      type: GraphQLString
    }
  })
});

module.exports = PointType;

const SectionType = require("./section-type");
