import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  return (
    <Container>
      <FlexContainer>
        <StyledLink to={"/arrondissements"}>
          <ContainerImg>
            <img
              src="/image/arrondissements.jpg"
              height="200px"
              width="auto"
              alt="Arrondissements de Paris"
            />
            <Title>Arrondissements de Paris</Title>
          </ContainerImg>
        </StyledLink>
        <StyledLink to={"/galerie-bâtiments-administratifs"}>
          <ContainerImg>
            <img
              src="/image/administrations.jfif"
              height="200px"
              width="auto"
              alt="Bâtiments Administratifs"
            />
            <Title>Bâtiments administratifs</Title>
          </ContainerImg>
        </StyledLink>
        <StyledLink to={"/quartiers"}>
          <ContainerImg>
            <img
              src="/image/quartiers.jfif"
              height="200px"
              width="auto"
              alt="quartiers de Paris"
            />
            <Title>Quartiers de Paris</Title>
          </ContainerImg>
        </StyledLink>
      </FlexContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: #f4f5f7;
  width: 1400px;
  margin: 0 auto;
`;
const FlexContainer = styled.div`
  display: grid;
  font-family: Arial, Verdana, Helvetica, sans-serif;
  grid-template-columns: repeat(3, 300px);
  grid-template-rows: repeat(4, auto);
  grid-gap: 10px;
  justify-items: center;
  margin-top: "";
`;
const StyledLink = styled(Link)``;
const ContainerImg = styled.div``;
const Title = styled.div``;

export default Home;
