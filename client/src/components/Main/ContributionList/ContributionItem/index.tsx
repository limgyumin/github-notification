import React from "react";
import styled from "styled-components";

import CountUp from "react-countup";
import { HiArrowRight } from "react-icons/hi";

type Props = {
  label: string;
  contribution: number;
};

const ContributionItem: React.FC<Props> = ({ label, contribution }) => {
  return (
    <Container>
      <Label>
        <HiArrowRight />
        <h1>{label}</h1>
      </Label>
      <Contribution>
        <div>
          <CountUp
            className="contribution"
            duration={2}
            separator=","
            end={contribution}
          />
          <span>회</span>
        </div>
      </Contribution>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.bgWhite};
  width: 31%;
  height: 11rem;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0px 8px 28px 0px rgba(0, 0, 0, 0.1);
`;

const Label = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.ftBlack};
    margin-right: 0.6rem;
  }

  & > h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.ftBlack};
  }
`;

const Contribution = styled.div`
  display: flex;
  justify-content: flex-end;

  & > div {
    .contribution {
      font-size: 2.6rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.ftBlack};
    }

    & > span {
      margin-left: 3px;
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
`;

export default ContributionItem;
