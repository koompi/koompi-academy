const graphql = require("graphql");
const User = require("../../models/user");
const Question = require("../../models/question");
const Reply = require("../../models/reply");

const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;

const AnswerType = new GraphQLObjectType({
  name: "Answer",
  fields: () => ({
    id: {
      type: GraphQLString
    },
    user_id: {
      type: GraphQLString
    },
    question_id: {
      type: GraphQLString
    },
    answer: {
      type: GraphQLString
    },
    created_at: {
      type: GraphQLString
    },
    user: {
      type: UserType,
      resolve: async (parent, arg) => {
        return User.findOne({ _id: parent.user_id });
      }
    },
    question: {
      type: QuestionType,
      resolve: async (parent, arg) => {
        return Question.findOne({ _id: parent.question_id });
      }
    },
    replies: {
      type: new GraphQLList(ReplyType),
      resolve(parent, args) {
        return Reply.find({ answer_id: parent.id });
      }
    }
  })
});

module.exports = AnswerType;

const UserType = require("./user-type");
const QuestionType = require("./question-type");
const ReplyType = require("./reply-type");
