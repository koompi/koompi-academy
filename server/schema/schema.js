const graphql = require("graphql");
const { RootMutation } = require("./mutation");
const { RootQuery } = require("./query");
const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
