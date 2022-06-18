import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

/** Components */
const Arrondissement = ({ url, arrond, commentaire }) => {
  console.log("arrondissement : ");
  return (
    <StyledLink to={`/photos-de-l-arrondissement/${arrond}`}>
      <Wrapper>
        <Image>
          <img
            src={`/image/${arrond}/${url}.jpg`}
            height="200px"
            //   width="auto"
            width="300px"
            alt="Arrondissement"
          />
        </Image>
        {/*       <div className="arrondissement__numero">{arrond}</div>*/}
        <Commentaire>{commentaire}</Commentaire>
      </Wrapper>
    </StyledLink>
  );
};

/** Styles */
/*const Wrapper = styled.div`
  position: relative;
  ${(p) => (p.isWrapped ? "display: block" : "display:flex")};
  display: flex;
  gap: 10px;
`;*/

const Wrapper = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
`;
const Numero = styled.div`
  bottom: 8px;
  color: #ffffff;
  font-size: 30px;
  left: 16px;
  position: absolute;
`;
const Image = styled.div``;
const Commentaire = styled.div``;
const StyledLink = styled(Link)``;

export default Arrondissement;
