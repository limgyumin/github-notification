import React, { useState } from "react";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import styled, { css } from "styled-components";

import notificationImage from "assets/images/notification.svg";

import { ALLOW_NOTIFICATION } from "constants/graphql/user.graphql";
import { UserResponse } from "types/user.type";

type Props = {
  allowFcm: boolean;
};

const DailyNotification: React.FC<Props> = ({ allowFcm }) => {
  const [allowed, setAllowed] = useState<boolean>(allowFcm);

  const [allowNotification] = useMutation<UserResponse>(ALLOW_NOTIFICATION);

  const onClickToggle = async (): Promise<void> => {
    await allowNotification();
    setAllowed((allowed) => !allowed);
  };

  return (
    <Container>
      <h1>1일 1커밋 알림</h1>
      <Wrapper>
        <ImageWrapper>
          <Image src={notificationImage} width={340} height={220} />
        </ImageWrapper>
        <Contents>
          <h3>커밋을 하지 않으셨다면 푸시 알림을 보내드려요</h3>
          <p>1일 1커밋을 실천 중인 개발자분께 추천드립니다!</p>
        </Contents>
        <ToggleButton $active={allowed} onClick={onClickToggle}>
          <p />
        </ToggleButton>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  & > h1 {
    font-size: 1.4rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.ftGray};
    margin-bottom: 1.5rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bgWhite};
  padding: 2rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0px 8px 28px 0px rgba(0, 0, 0, 0.1);
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  margin-bottom: 2.5rem;
`;

const Contents = styled.div`
  text-align: center;
  margin-bottom: 1rem;

  & > h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.ftBlack};
    margin-bottom: 0.2rem;
  }

  & > p {
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.ftGray};
  }
`;

const ToggleButton = styled.button<{ $active: boolean }>`
  outline: none;
  border: none;
  width: 52px;
  height: 30px;
  border-radius: 3rem;
  position: relative;
  cursor: pointer;
  transition: background-color ease 0.2s;

  ${(props) =>
    props.$active
      ? css`
          background-color: ${({ theme }) => theme.colors.bgBlack};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.bgGray1};
        `}

  & > p {
    position: absolute;
    top: 5px;
    background-color: ${({ theme }) => theme.colors.bgWhite};
    border-radius: 50%;
    width: 20px;
    height: 20px;
    transition: left ease 0.2s;

    ${(props) =>
      props.$active
        ? css`
            left: 27px;
          `
        : css`
            left: 5px;
          `}
  }
`;

export default DailyNotification;
