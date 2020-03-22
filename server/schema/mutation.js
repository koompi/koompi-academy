const graphql = require("graphql");
const bcrypt = require("bcryptjs");

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

const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLFloat,
  GraphQLInt,
  GraphQLBoolean
} = graphql;

const RootMutation = new GraphQLObjectType({
  name: "RootMutationtype",
  fields: () => ({
    // =========== Role Section =========
    create_role: {
      type: RoleType,
      args: { title: { type: GraphQLString } },
      resolve(parent, args) {
        const role = new Role({ ...args });
        return role.save();
      }
    },
    // =========== User Section =========
    create_user: {
      type: UserType,
      args: {
        fullname: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        try {
          const saltRounds = 10;
          const hashPassword = await bcrypt.hash(args.password, saltRounds);
          const user = new User({ ...args, password: hashPassword });
          const isEmail = await User.findOne({ email: args.email });
          try {
            if (isEmail) {
              throw new Error("Email already exist...");
            }
            return user.save();
          } catch (error) {
            console.log(error);
            throw new Error(error);
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    },
    delete_user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return User.findByIdAndDelete({ _id: args.id });
      }
    },
    // =========== Category Section =========
    create_category: {
      type: CategoryType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        user_id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        try {
          const category = new Category({ ...args });
          return category.save();
        } catch (error) {
          console.log(error);
        }
      }
    },
    update_category: {
      type: CategoryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        try {
          await Category.findByIdAndUpdate({ _id: args.id }, { ...args });
          return Category.findOne({ _id: args.id });
        } catch (error) {
          console.log(error);
        }
      }
    },
    delete_category: {
      type: CategoryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        try {
          return Category.findByIdAndDelete({ _id: args.id });
        } catch (error) {
          console.log(error);
        }
      }
    },
    // =========== Category Section =========
    create_course: {
      type: CourseType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        feature_image: { type: new GraphQLNonNull(GraphQLString) },
        owner_id: { type: new GraphQLNonNull(GraphQLID) },
        category_name: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(GraphQLString) },
        tags: { type: new GraphQLList(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        try {
          const course = new Course({ ...args });
          return course.save();
        } catch (error) {
          console.log(error);
        }
      }
    },
    delete_course: {
      type: CourseType,
      args: { course_id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Course.findByIdAndDelete({ _id: args.course_id });
      }
    },
    // =========== Create List Item Section =========
    create_list_item: {
      type: ListItemType,
      args: {
        course_id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        section: { type: GraphQLInt },
        point: { type: GraphQLInt },
        preview: { type: new GraphQLNonNull(GraphQLBoolean) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        try {
          const list_item = new ListItem({ ...args });
          return list_item.save();
        } catch (error) {
          console.log(error);
        }
      }
    },
    // =========== Sections Section =========
    create_section: {
      type: SectionType,
      args: {
        course_id: { type: new GraphQLNonNull(GraphQLID) },
        no: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        try {
          const section = new Section({ ...args });
          return section.save();
        } catch (error) {
          console.log(error);
        }
      }
    },
    update_section: {
      type: SectionType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        no: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        try {
          await Section.findByIdAndUpdate({ _id: args.id }, { ...args });
          return { message: "Section updated successfully" };
        } catch (error) {
          console.log(error);
        }
      }
    },
    delete_section: {
      type: SectionType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: async (parent, args) => {
        try {
          await Section.findByIdAndDelete(args.id);
          return { message: "Section deleted successfully" };
        } catch (error) {
          console.log(error);
        }
      }
    },
    // =========== Create Point =========
    create_point: {
      type: PointType,
      args: {
        section_id: { type: new GraphQLNonNull(GraphQLID) },
        no: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        video_link: { type: new GraphQLNonNull(GraphQLString) },
        preview: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        try {
          const point = new Point({ ...args });
          return point.save();
        } catch (error) {
          console.log(error);
        }
      }
    },
    update_point: {
      type: PointType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        no: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        video_link: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        try {
          await Point.findByIdAndUpdate(args.id, { ...args });
          return { message: "Point updated successfully" };
        } catch (error) {
          console.log(error);
        }
      }
    },
    delete_point: {
      type: PointType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: async (parent, args) => {
        try {
          await Point.findByIdAndDelete(args.id);
          return { message: "Point deleted successfully" };
        } catch (error) {
          console.log(error);
        }
      }
    },
    // =========== Question Section =========
    create_question: {
      type: QuestionType,
      args: {
        course_id: { type: new GraphQLNonNull(GraphQLID) },
        user_id: { type: new GraphQLNonNull(GraphQLID) },
        question: { type: new GraphQLNonNull(GraphQLString) },
        created_at: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        try {
          const question = new Question({ ...args });
          if (question) return question.save();
        } catch (error) {
          console.log(error);
        }
      }
    },
    delete_question: {
      type: QuestionType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        try {
          return Question.findByIdAndDelete({ _id: args.id });
        } catch (error) {}
      }
    },
    // =========== Answer Section =========
    create_answer: {
      type: AnswerType,
      args: {
        user_id: { type: new GraphQLNonNull(GraphQLID) },
        question_id: { type: new GraphQLNonNull(GraphQLID) },
        answer: { type: new GraphQLNonNull(GraphQLString) },
        created_at: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        try {
          const answer = new Answer({ ...args });
          if (answer) return answer.save();
        } catch (error) {
          console.log(error);
        }
      }
    },
    // =========== Reply Section =========
    create_reply: {
      type: ReplyType,
      args: {
        user_id: { type: new GraphQLNonNull(GraphQLID) },
        answer_id: { type: new GraphQLNonNull(GraphQLID) },
        reply: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        try {
          const reply = new Reply({ ...args });
          if (reply) return reply.save();
        } catch (error) {
          console.log(error);
        }
      }
    },
    delete_reply: {
      type: ReplyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: async (parent, args) => {
        try {
          return Reply.findByIdAndDelete({ _id: args.id });
        } catch (error) {
          console.log("you can not delete this reply.");
        }
      }
    },
    // =========== Rate Section =========
    create_rate: {
      type: RateType,
      args: {
        course_id: { type: new GraphQLNonNull(GraphQLID) },
        score: { type: new GraphQLNonNull(GraphQLInt) },
        comment: { type: new GraphQLNonNull(GraphQLString) },
        user_id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        try {
          const rate = new Rate({ ...args });
          if (rate) return rate.save();
        } catch (error) {
          console.log(error);
        }
      }
    },
    // =========== Tag Section =========
    create_tag: {
      type: TagType,
      args: {
        title: { type: new GraphQLList(GraphQLString) },
        user_id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        try {
          const tag = new Tag({ ...args });
          if (tag) return tag.save();
        } catch (error) {
          console.log(error);
        }
      }
    }
  })
});

module.exports = { RootMutation };
