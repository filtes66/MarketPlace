const ArrondHeader = () => {
    let numeroArrond = [
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      "XI",
      "XII",
      "XIII",
      "XIV",
      "XV",
      "XVI",
      "XVII",
      "XVIII",
      "XIX",
      "XX",
    ];
    let arrondissements = [];

    for (let i = 0; i < 20; i++) {
      arrondissements.push(
        <li
          key={i.toString()}
          className={`"GalleryArrondissement__numero-arrond" ${
            arrond == i + 1 ? "GalleryArrondissement--circle" : ""
          }`}
        >
          <Link to={`/photos-de-l-arrondissEment/${i + 1}`}>
            <p>{numeroArrond[i]}</p>
          </Link>
        </li>
      );
    }
    return <>{arrondissements}</>;
  };