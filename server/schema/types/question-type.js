const graphql = require("graphql");
const User = require("../../models/user");
const Answer = require("../../models/answer");

const { GraphQLString, GraphQLList, GraphQLID, GraphQLObjectType } = graphql;

const QuestionType = new GraphQLObjectType({
  name: "Question",
  fields: () => ({
    id: { type: GraphQLID },
    course_id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    question: { type: GraphQLString },
    created_at: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: async (parent, args) => {
        return await User.findOne({ _id: parent.user_id });
      }
    },
    answers: {
      type: new GraphQLList(AnswerType),
      resolve: async (parent, args) => {
        return await Answer.find({ question_id: parent.id });
      }
    }
  })
});

module.exports = QuestionType;
const UserType = require("./user-type");
const AnswerType = require("./answer-type");
