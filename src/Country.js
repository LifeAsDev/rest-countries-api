import { motion } from "framer-motion";

const Country = ({
  alt,
  name,
  population,
  region,
  capital,
  flag,
  setCountryMain,
  arrayIndex,
}) => {
  return (
    <motion.div
      onClick={() => setCountryMain(arrayIndex)}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="country-box"
    >
      <div className="country-box-inner">
        <img alt={alt} src={flag}></img>
        <div className="country-details-search-box">
          <p className="country-name-search">{name}</p>
          <p className="country-details">
            <span>Population: </span>
            {population.toLocaleString("en-US", { useGrouping: true })}
          </p>
          <p className="country-details">
            <span>Region: </span>
            {region}
          </p>
          {capital !== null ? (
            <p className="country-details">
              <span>Capital: </span>
              {capital}
            </p>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};
export default Country;
