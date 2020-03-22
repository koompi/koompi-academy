import gql from "graphql-tag";

const GET_USER = gql`
  query($user_id: ID!) {
    user(id: $user_id) {
      fullname
      email
      avatar
      id
      bio
      created_at
      role {
        id
        title
      }
    }
  }
`;

const GET_USERS = gql`
  {
    users {
      fullname
      email
    }
  }
`;

const GET_CATEGORIES = gql`
  {
    categories {
      id
      title
    }
  }
`;

const GET_COURSE = gql`
  query($id: ID!) {
    course(id: $id) {
      id
      title
      description
    }
  }
`;

const GET_COURSES_BY_USER = gql`
  query($owner_id: ID!) {
    courses_by_owner(owner_id: $owner_id) {
      id
      title
      feature_image
      owner_id
      category_name
      status
      tags
      price
      description
      category {
        title
      }
      user {
        fullname
        avatar
      }
    }
  }
`;
const GET_COURSES = gql`
  query {
    courses {
      id
      title
      feature_image
      owner_id
      category_name
      status
      tags
      price
      description
      created_at
      category {
        title
      }
      user {
        fullname
        avatar
      }
    }
  }
`;

const GET_COURSES_FOR_SEARCH = gql`
  query($search: String!) {
    courses_by_search(search: $search) {
      id
      title
      feature_image
      owner_id
      category_name
      status
      tags
      price
      description
      created_at
      category {
        title
      }
      user {
        fullname
        avatar
      }
    }
  }
`;

const GET_COURSES_BY_CATEGORY = gql`
  query($query: String!) {
    courses_by_search(query: $query) {
      id
      title
      feature_image
      owner_id
      category_name
      status
      tags
      price
      description
      created_at
      category {
        title
      }
      user {
        fullname
        avatar
      }
    }
  }
`;

const GET_SECTION = gql`
  query($course_id: ID!) {
    sections(course_id: $course_id) {
      title
      no
      id
      points {
        id
        title
        no
        video_link
      }
    }
  }
`;

const GET_SECTION_BY_ID = gql`
  query($id: ID!) {
    section_by_id(id: $id) {
      title
      no
      id
    }
  }
`;

const GET_POINT_BY_ID = gql`
  query($id: ID!) {
    point_by_id(id: $id) {
      title
      no
      id
      video_link
    }
  }
`;

const GET_COURSE_AND_QUESTIONS = gql`
  query($course_id: ID!, $id: ID!) {
    course(id: $id) {
      id
      title
      feature_image
      owner_id
      category_name
      status
      tags
      price
      description
      category {
        title
      }
    }
    questions(course_id: $course_id) {
      id
      question
      created_at
      user {
        fullname
        avatar
      }
      answers {
        id
        answer
        question_id
        created_at
        user {
          fullname
          avatar
        }
      }
    }
  }
`;

export {
  GET_USER,
  GET_USERS,
  GET_CATEGORIES,
  GET_COURSES,
  GET_COURSE,
  GET_SECTION,
  GET_COURSES_BY_USER,
  GET_COURSE_AND_QUESTIONS,
  GET_COURSES_FOR_SEARCH,
  GET_COURSES_BY_CATEGORY,
  GET_SECTION_BY_ID,
  GET_POINT_BY_ID
};
