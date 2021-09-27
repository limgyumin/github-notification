import React from "react";
import Image from "next/image";
import styled from "styled-components";

import Profile from "./Profile";
import ContributionList from "./ContributionList";
import DailyNotification from "./DailyNotification";

import bannerImage from "assets/images/banner.svg";

import { useFetchCurrentUser } from "hooks/useFetchCurrentUser";

const Main: React.FC = () => {
  const { data } = useFetchCurrentUser();

  if (!data) return <div>loading...</div>;

  const { username, bio, avatar, contributions, allowFcm } = data.me;

  return (
    <Container>
      <Banner>
        <Wrapper>
          <Profile avatar={avatar} username={username} bio={bio} />
          <ImageWrapper>
            <Image src={bannerImage} width={650} height={380} />
          </ImageWrapper>
        </Wrapper>
      </Banner>
      <Contents>
        <ContributionList contributions={contributions} />
        <DailyNotification allowFcm={allowFcm} />
      </Contents>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bgGray};
`;

const Banner = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 35rem;
  background-color: ${({ theme }) => theme.colors.bgBlack};
  position: relative;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  position: absolute;
  z-index: 0;
  bottom: 0;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 850px;
  padding-top: 6.5rem;
  margin: 0 1rem;
  position: relative;
`;

const Contents = styled.div`
  width: 100%;
  max-width: 850px;
  padding: 3rem 0 4rem;
  margin: 0 1rem;
`;

export default Main;
