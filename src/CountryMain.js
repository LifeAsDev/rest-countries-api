const BackIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
    </svg>
  );
};
const CountryMain = ({ setCountryMain, list, countryMain }) => {
  return (
    <div className="country-main">
      <div onClick={() => setCountryMain(-1)} className="back-btn">
        <BackIcon />
        Back
      </div>
      <div className="country-details-main">
        <img alt={countryMain.flags.alt} src={countryMain.flags.svg}></img>
        <div className="country-details-main-text">
          <h1>{countryMain.name.common}</h1>
          <div className="country-details-box1">
            <div className="country-details-box1-left">
              <p className="text1">
                <span>Native Name: </span>
                {countryMain.name.official}
              </p>
              <p className="text1">
                <span>Population: </span>
                {countryMain.population.toLocaleString("en-US", {
                  useGrouping: true,
                })}
              </p>
              <p className="text1">
                <span>Region: </span>
                {countryMain.region}
              </p>
              {countryMain.hasOwnProperty("subregion") ? (
                <p className="text1">
                  <span>Sub Region: </span>
                  {countryMain.subregion}
                </p>
              ) : null}
              {countryMain.hasOwnProperty("capital") ? (
                <p className="text1">
                  <span>Capital: </span>
                  {Object.values(countryMain.capital).join(", ")}
                </p>
              ) : null}
            </div>
            <div className="country-details-box1-right">
              <p className="text1">
                <span>Top Level Domain: </span>
                {countryMain.tld}
              </p>
              {countryMain.hasOwnProperty("currencies") ? (
                <p className="text1">
                  <span>Currencies: </span>
                  {Object.values(countryMain.currencies)
                    .map((currency) => currency.name)
                    .join(", ")}
                </p>
              ) : null}
              {countryMain.hasOwnProperty("languages") ? (
                <p className="text1">
                  <span>Languages: </span>
                  {Object.values(countryMain.languages).join(", ")}
                </p>
              ) : null}
            </div>
          </div>
          {countryMain.hasOwnProperty("borders") ? (
            <div className="border-countries">
              <p className="text1">
                <span>Border Countries: </span>
              </p>
              {countryMain.borders.map((item, index) => {
                const countryBorderIndex = list.findIndex(
                  (element) => element.cca3 === item
                );
                return (
                  <p
                    onClick={() => setCountryMain(countryBorderIndex)}
                    key={index}
                    className="text1 country-border"
                  >
                    {list[countryBorderIndex].name.common}
                  </p>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default CountryMain;
