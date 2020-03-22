const graphql = require("graphql");
const User = require("../../models/user");
const Answer = require("../../models/answer");

const { GraphQLObjectType, GraphQLString } = graphql;

const ReplyType = new GraphQLObjectType({
  name: "Reply",
  fields: () => ({
    id: {
      type: GraphQLString
    },
    user_id: {
      type: GraphQLString
    },
    answer_id: {
      type: GraphQLString
    },
    reply: {
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
    answer: {
      type: AnswerType,
      resolve: async (parent, value) => {
        return Answer.findOne({ _id: parent.answer_id });
      }
    }
  })
});

module.exports = ReplyType;

const UserType = require("./user-type");
const AnswerType = require("./answer-type");
