import type { GetServerSideProps, NextPage } from "next";

import Main from "components/Main";

import { addApolloState, initializeApollo } from "utils/libs/apollo-client";
import { FETCH_CURRENT_USER } from "constants/graphql/user.graphql";
import { UserResponse } from "types/user.type";

const MainPage: NextPage = () => {
  return <Main />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const apolloClient = initializeApollo(null, ctx);

    await apolloClient.query<UserResponse>({
      query: FETCH_CURRENT_USER,
    });

    return addApolloState(apolloClient, {
      props: {},
    });
  } catch (error) {
    return {
      props: {},
      redirect: {
        destination: "/register",
      },
    };
  }
};

export default MainPage;
