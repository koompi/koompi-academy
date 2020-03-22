const graphql = require("graphql");
const User = require("../../models/user");

const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;

const TagType = new GraphQLObjectType({
  name: "Tag",
  fields: () => ({
    id: {
      type: GraphQLString
    },
    user_id: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    user: {
      type: UserType,
      resolve: async (parent, value) => {
        return User.findOne({ _id: parent.user_id });
      }
    }
  })
});

module.exports = TagType;

const UserType = require("./user-type");
