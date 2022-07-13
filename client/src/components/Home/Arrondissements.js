import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import thunk from "../../store/reducers/photos/thunk";
import Arrondissement from "./Arrondissement/Arrondissement";
import styled from "styled-components";

const Arrondissements = () => {
  console.log("ARRONDISSEMENTS");
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.photos);

  useEffect(() => {
    console.log("useeffect");
    dispatch(thunk.fetchPhotos());
  }, [dispatch]);

  console.log("ITEMS", items, "IS LOADING", isLoading);

  /** Components */
  const ArrondissementsRender = ({ items }) => {
    return items.districtArray.map((item) =>
      item.map(
        ({ id, url, arrond, home, commentaire }) =>
          home && (
            <Arrondissement
              key={id}
              url={url}
              arrond={arrond}
              home={home}
              commentaire={commentaire}
            />
          )
      )
    );
  };

  if (!Object.keys(items).length) {
    return null;
  }

  return (
    <Container>
      <FlexContainer>
        {isLoading ? (
          <p>En cours de chargement...</p>
        ) : (
          <ArrondissementsRender items={items} />
        )}
      </FlexContainer>
    </Container>
  );
};

/** Styles */
const Container = styled.div`
  background-color: #f4f5f7;
  width: 1400px;
  margin: 0 auto;
`;
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default Arrondissements;
