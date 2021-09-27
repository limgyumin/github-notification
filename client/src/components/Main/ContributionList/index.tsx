import React from "react";
import styled from "styled-components";

import { IoInformationCircleOutline } from "react-icons/io5";

import ContributionItem from "./ContributionItem";

import { Contributions } from "types/user.type";

type Props = {
  contributions: Contributions;
};

const ContributionList: React.FC<Props> = ({ contributions }) => {
  const {
    todayContributions,
    weekContributions,
    totalContributions,
  } = contributions;

  return (
    <Container>
      <h1>내 커밋 정보</h1>
      <Wrapper>
        <ContributionItem
          label={"오늘 커밋"}
          contribution={todayContributions}
        />
        <ContributionItem
          label={"이번 주 커밋"}
          contribution={weekContributions}
        />
        <ContributionItem
          label={"전체 커밋"}
          contribution={totalContributions}
        />
      </Wrapper>
      <Notice>
        <IoInformationCircleOutline />
        <p>
          매일 8, 10, 12, 14, 16, 18, 20시 마다 커밋 정보 갱신과 동시에 푸시
          알림이 전송됩니다.
        </p>
      </Notice>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 4rem;

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
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
`;

const Notice = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1.2rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.bgLGray};

  & > svg {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.ftGray};
    margin-right: 0.5rem;
  }

  & > p {
    font-weight: 500;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.ftGray};
  }
`;

export default ContributionList;
