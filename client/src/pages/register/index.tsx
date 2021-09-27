import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { FETCH_CURRENT_USER } from "constants/graphql/user.graphql";
import { addApolloState, initializeApollo } from "utils/libs/apollo-client";
import { UserResponse } from "types/user.type";

const RegisterPage: NextPage = () => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeApollo(null, ctx);

  try {
    const { data } = await apolloClient.query<UserResponse>({
      query: FETCH_CURRENT_USER,
    });

    if (data && data.me) {
      return addApolloState(apolloClient, {
        props: {},
        redirect: {
          destination: "/",
        },
      });
    }
  } catch (e) {
    return {
      props: {},
    };
  }
};

export default RegisterPage;
