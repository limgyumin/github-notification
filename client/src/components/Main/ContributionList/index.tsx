import React, { useMemo } from "react";
import styled from "styled-components";

import { IoInformationCircleOutline } from "react-icons/io5";

import ContributionItem from "./ContributionItem";

import { Contributions } from "types/user.type";
import { removeTypename } from "utils/libs/remove-typename";

type OmittedContributions = Omit<Contributions, "__typename">;

type ContributionLabel = keyof OmittedContributions;

type ContributionItem = { label: ContributionLabel; count: number };

type Props = {
  contributions: Contributions;
};

const ContributionList: React.FC<Props> = ({ contributions }) => {
  const convertObject2Array = (
    object: OmittedContributions
  ): ContributionItem[] =>
    (Object.entries(object) as [ContributionLabel, number][]).map((array) => {
      const [label, count] = array;
      const object: ContributionItem = { label, count };

      return object;
    });

  const sortByOrder = (items: ContributionItem[]): ContributionItem[] => {
    const order = { today: 1, week: 2, total: 3 };

    return items.sort((x, y) => order[x.label] - order[y.label]);
  };

  const getNameByLabel: { [key in ContributionLabel]: string } = {
    today: "오늘 커밋",
    week: "주간 커밋",
    total: "전체 커밋",
  };

  const contributionList = useMemo<ContributionItem[]>(
    () => sortByOrder(convertObject2Array(removeTypename(contributions))),
    [contributions]
  );

  return (
    <Container>
      <h1>내 커밋 정보</h1>
      <Wrapper>
        {contributionList.map((item, index) => (
          <ContributionItem
            key={index}
            label={getNameByLabel[item.label]}
            contribution={item.count}
          />
        ))}
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
  margin-bottom: 3rem;

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
