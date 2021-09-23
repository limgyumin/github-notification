import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { FETCH_CURRENT_USER } from "constants/graphql/user.graphql";
import { createApolloClient } from "utils/libs/apollo-client";
import { UserResponse } from "types/user.type";

const RegisterPage: NextPage = () => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const client = createApolloClient(ctx);

    const { data } = await client.query<UserResponse>({
      query: FETCH_CURRENT_USER,
    });

    if (data.me && data.me.id) {
      return {
        props: {},
        redirect: {
          destination: "/",
        },
      };
    }

    return {
      props: {},
    };
  } catch (e) {
    /* need error handling */
    return {
      props: {},
    };
  }
};

export default RegisterPage;
