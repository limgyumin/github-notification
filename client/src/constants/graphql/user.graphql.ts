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

export const SAVE_FCM_TOKEN = gql`
  mutation saveFcmToken($fcmToken: String!) {
    saveFcmToken(fcmToken: $fcmToken) {
      id
    }
  }
`;

export const ALLOW_NOTIFICATION = gql`
  mutation {
    allowNotification {
      id
      allowFcm
    }
  }
`;
