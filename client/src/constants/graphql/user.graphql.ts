import { gql } from "@apollo/client";

export const FETCH_CURRENT_USER = gql`
  query {
    me {
      id
      avatar
      username
      bio
      allowFcm
      createdAt
      contributions {
        totalContributions
        weekContributions
        todayContributions
      }
    }
  }
`;
