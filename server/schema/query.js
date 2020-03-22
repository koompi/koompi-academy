const graphql = require("graphql");
const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt
} = graphql;

// ==================== Types ======================
const RoleType = require("./types/role-type");
const UserType = require("./types/user-type");
const CategoryType = require("./types/category-type");
const CourseType = require("./types/course-type");
const ListItemType = require("./types/list-item-type");
const QuestionType = require("./types/question-type");
const AnswerType = require("./types/answer-type");
const ReplyType = require("./types/reply-type");
const RateType = require("./types/rate-type");
const TagType = require("./types/tag-type");
const SectionType = require("./types/section-type");
const PointType = require("./types/point-type");

// ==================== Models =====================
const Role = require("../models/role");
const User = require("../models/user");
const Category = require("../models/category");
const Course = require("../models/course");
const ListItem = require("../models/list_item");
const Question = require("../models/question");
const Answer = require("../models/answer");
const Reply = require("../models/reply");
const Rate = require("../models/rate");
const Tag = require("../models/tag");
const Section = require("../models/section");
const Point = require("../models/point");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // =========== Roles Section =========
    role: {
      type: RoleType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Role.findById(args.id);
      }
    },
    roles: {
      type: new GraphQLList(RoleType),
      resolve(parent, args) {
        return Role.find();
      }
    },
    // =========== Users Section =========
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      }
    },
    // =========== Categories Section =========
    category: {
      type: CategoryType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Category.findOne({ _id: args.id });
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return Category.find();
      }
    },
    // =========== Courses Section =========
    course: {
      type: CourseType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Course.findOne({ _id: args.id });
      }
    },
    courses_by_owner: {
      type: new GraphQLList(CourseType),
      args: { owner_id: { type: GraphQLID } },
      resolve(parent, args) {
        return Course.find({ owner_id: args.owner_id }).sort({
          created_at: -1
        });
      }
    },
    courses: {
      type: new GraphQLList(CourseType),
      args: {
        first: {
          name: "first",
          type: GraphQLInt
        },
        skip: {
          name: "skip",
          type: GraphQLInt
        }
      },
      resolve(parent, { first = null, skip = null }, args) {
        return Course.find({})
          .limit(first)
          .skip(skip)
          .sort({ created_at: -1 });
      }
    },
    courses_by_search: {
      type: new GraphQLList(CourseType),
      args: {
        query: { type: GraphQLString }
      },
      resolve: (parent, args) => {
        return Course.find({
          category_name: { $regex: args.query, $options: "i" }
        }).sort({ created_at: -1 });
      }
    },
    // =========== Question Section =========
    questions: {
      type: new GraphQLList(QuestionType),
      args: {
        course_id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Question.find({ course_id: args.course_id }).sort({
          created_at: "desc"
        });
      }
    },
    // =========== Answer Section =========
    answers: {
      type: new GraphQLList(AnswerType),
      args: {
        question_id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Answer.find({ question_id: args.question_id }).sort({
          created_at: -1
        });
      }
    },
    // =========== Reply Section =========
    replies: {
      type: new GraphQLList(ReplyType),
      resolve(parent, args) {
        return Reply.find();
      }
    },
    // =========== Tags Section =========
    tags: {
      type: new GraphQLList(TagType),
      resolve(parent, args) {
        return Tag.find();
      }
    },
    // =========== Sections Section =========
    sections: {
      type: new GraphQLList(SectionType),
      args: {
        course_id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Section.find({ course_id: args.course_id });
      }
    },
    section_by_id: {
      type: SectionType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Section.findById(args.id);
      }
    },
    // =========== Point Section =========
    points: {
      type: new GraphQLList(PointType),
      args: {
        section_id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Point.find({ section_id: args.section_id });
      }
    },
    point_by_id: {
      type: PointType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Point.findById(args.id);
      }
    }
  }
});

module.exports = { RootQuery };
