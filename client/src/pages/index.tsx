import type { GetServerSideProps, NextPage } from "next";

import Main from "components/Main";

import { addApolloState, initializeApollo } from "utils/libs/apollo-client";
import { FETCH_CURRENT_USER } from "constants/graphql/user.graphql";

const MainPage: NextPage = () => {
  return <Main />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeApollo(null, ctx);

  await apolloClient.query({
    query: FETCH_CURRENT_USER,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default MainPage;
