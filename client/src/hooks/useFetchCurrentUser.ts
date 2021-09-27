import { Profiler, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";

import firebase from "firebase/app";
import option from "config/firebase";
import "firebase/messaging";
import cookie from "js-cookie";

import { UserResponse } from "types/user.type";
import {
  FETCH_CURRENT_USER,
  SAVE_FCM_TOKEN,
} from "constants/graphql/user.graphql";
import { COOKIE_ACCESS_TOKEN_KEY } from "constants/cookie";

export const useFetchCurrentUser = () => {
  const { loading, data } = useQuery<UserResponse>(FETCH_CURRENT_USER);
  const [saveFcmToken] = useMutation<UserResponse>(SAVE_FCM_TOKEN);

  const getFcmToken = async () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(option);
    }

    const fcmToken = await firebase.messaging().getToken();

    await saveFcmToken({ variables: { fcmToken } });
  };

  const getPermission = async () => {
    if ("Notification" in window) {
      try {
        Notification.requestPermission().then(
          (permission: NotificationPermission) => {
            if (permission === "granted") {
              getFcmToken();
            }
          }
        );
      } catch (error) {
        if (error instanceof TypeError) {
          Notification.requestPermission(
            (permission: NotificationPermission) => {
              if (permission === "granted") {
                getFcmToken();
              }
            }
          );
        }
      }
    }
  };

  useEffect(() => {
    const accessToken = cookie.get(COOKIE_ACCESS_TOKEN_KEY);

    if (data && data.me.id && accessToken) {
      getPermission();
    }
  }, []);

  return { loading, data };
};
