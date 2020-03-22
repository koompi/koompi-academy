const graphql = require("graphql");
const User = require("../../models/user");

const { GraphQLString, GraphQLList, GraphQLID, GraphQLObjectType } = graphql;

const RoleType = new GraphQLObjectType({
  name: "Role",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    created_at: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (parent, args) => {
        return await User.find({ role: parent.title });
      }
    }
  })
});

module.exports = RoleType;
const UserType = require("./user-type");
