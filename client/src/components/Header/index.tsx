import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled, { css } from "styled-components";
import _ from "lodash";

import logo from "assets/images/logo.svg";

const Header: React.FC = () => {
  const [shadow, setShadow] = useState<boolean>(false);

  const handleThrottleScroll = _.throttle(() => {
    setShadow(window.scrollY > 0);
  }, 200);

  useEffect(() => {
    document.addEventListener("scroll", handleThrottleScroll);
    return () => document.removeEventListener("scroll", handleThrottleScroll);
  }, []);

  return (
    <Container $shadow={shadow}>
      <Wrapper>
        <Image src={logo} width={160} height={25} />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div<{ $shadow: boolean }>`
  width: 100%;
  height: 3.2rem;
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.bgBlack};
  transition: box-shadow ease 0.2s;

  ${(props) =>
    props.$shadow &&
    css`
      box-shadow: 0px 8px 28px 0px rgba(0, 0, 0, 0.15);
    `}
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 850px;
  margin: 0 1rem;
`;

export default Header;
