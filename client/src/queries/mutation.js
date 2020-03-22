import gql from "graphql-tag";

const CREATE_USER = gql`
  mutation($fullname: String!, $email: String!, $password: String!) {
    create_user(fullname: $fullname, email: $email, password: $password) {
      fullname
      email
      role {
        title
      }
    }
  }
`;

const CREATE_COURSE = gql`
  mutation(
    $title: String!
    # $feature_image: String!
    $owner_id: ID!
    $category_name: String!
    $status: String!
    $tags: [String]
    $price: Float!
    $description: String!
    $feature_image: String!
  ) {
    create_course(
      title: $title
      feature_image: $feature_image
      owner_id: $owner_id
      category_name: $category_name
      status: $status
      tags: $tags
      price: $price
      description: $description
    ) {
      title
      feature_image
      owner_id
      category_name
      status
      tags
      price
      description
      user {
        fullname
      }
      category {
        title
      }
    }
  }
`;

const DELETE_COURSE = gql`
  mutation($course_id: ID!) {
    delete_course(course_id: $course_id) {
      title
    }
  }
`;

const CREATE_SECTION = gql`
  mutation($no: String!, $title: String!, $course_id: ID!) {
    create_section(no: $no, title: $title, course_id: $course_id) {
      no
      title
      course {
        title
      }
    }
  }
`;

const UPDATE_SECTION = gql`
  mutation($no: String!, $title: String!, $id: ID!) {
    update_section(no: $no, title: $title, id: $id) {
      message
    }
  }
`;

const DELETE_SECTION = gql`
  mutation($id: ID!) {
    delete_section(id: $id) {
      message
    }
  }
`;

const CREATE_POINT = gql`
  mutation(
    $no: String!
    $title: String!
    $section_id: ID!
    $video_link: String!
    $preview: Boolean
  ) {
    create_point(
      no: $no
      title: $title
      section_id: $section_id
      video_link: $video_link
      preview: $preview
    ) {
      no
      title
      video_link
      preview
      section {
        id
        title
      }
    }
  }
`;

const UPDATE_POINT = gql`
  mutation($no: String!, $title: String!, $id: ID!, $video_link: String!) {
    update_point(no: $no, title: $title, id: $id, video_link: $video_link) {
      message
    }
  }
`;

const DELETE_POINT = gql`
  mutation($id: ID!) {
    delete_point(id: $id) {
      message
    }
  }
`;

const CREATE_QUESTION = gql`
  mutation(
    $course_id: ID!
    $user_id: ID!
    $question: String!
    $created_at: String!
  ) {
    create_question(
      course_id: $course_id
      user_id: $user_id
      question: $question
      created_at: $created_at
    ) {
      question
    }
  }
`;

const CREATE_ANSWER = gql`
  mutation(
    $question_id: ID!
    $user_id: ID!
    $answer: String!
    $created_at: String!
  ) {
    create_answer(
      question_id: $question_id
      user_id: $user_id
      answer: $answer
      created_at: $created_at
    ) {
      id
      answer
    }
  }
`;

export {
  CREATE_COURSE,
  CREATE_USER,
  CREATE_SECTION,
  UPDATE_SECTION,
  CREATE_POINT,
  CREATE_QUESTION,
  CREATE_ANSWER,
  DELETE_COURSE,
  DELETE_SECTION,
  DELETE_POINT,
  UPDATE_POINT
};
