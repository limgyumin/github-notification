import { useQuery } from "@apollo/client";
import { FETCH_CURRENT_USER } from "constants/graphql/user.graphql";
import React from "react";

const Main: React.FC = () => {
  const { loading, data } = useQuery(FETCH_CURRENT_USER);

  if (loading) return <div>loading...</div>;

  return <div>{data.me.username}</div>;
};

export default Main;
