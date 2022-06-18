import GalleryArrondissementSelected from "../GalleryArrondissement/GalleryArrondissement";

const Arrondissements = ({ items }) => {
  !!items.length &&
    items.map((ArrondissementPhotos) =>
      ArrondissementPhotos.map(
        ({ id, url, arrond, home }) =>
          home && (
            <PhotoArrondissementHome
              key={id}
              url={url}
              arrond={arrond}
              home={home}
            />
          )
      )
    );

  return (
    <div className="home">
      <div className="home__wrapper">
        <Loading isLoading={isLoading} />
        <div className="home__grid">
          <ArrondissementsPhoto items={items} />
        </div>
        <Empty isVisible={!!items} />
      </div>
    </div>
  );
};

export default Arrondissements;
