import React from "react";
import Image from "next/image";
import styled from "styled-components";

type Props = {
  avatar: string;
  username: string;
  bio: string;
};

const Profile: React.FC<Props> = ({ avatar, username, bio }) => {
  return (
    <Container>
      <ImageWrapper>
        <Image src={avatar} width={100} height={100} />
      </ImageWrapper>
      <Info>
        <h2>{username}</h2>
        <p>{bio}</p>
      </Info>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 50%;
  width: 3.2rem;
  height: 3.2rem;
  border: 1px solid ${({ theme }) => theme.colors.bdGray};
`;

const Info = styled.div`
  margin-left: 1.2rem;

  & > h2 {
    font-size: 1.3rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.ftWhite};
    margin-bottom: 0.2rem;
  }

  & > p {
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.ftLGray};
  }
`;

export default Profile;
