import React from "react";
import Image from "next/image";
import styled from "styled-components";

import logo from "assets/images/logo.svg";

const Header: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Image src={logo} width={170} height={30} />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.bgBlack};
  box-shadow: 0px 8px 28px 0px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 850px;
  margin: 0 1rem;
`;

export default Header;
