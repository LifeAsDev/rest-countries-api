import Country from "./Country";
import { AnimatePresence, motion } from "framer-motion";
const SearchIcon = () => {
  return (
    <svg
      className="light"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
    >
      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
    </svg>
  );
};
const SortIcon = ({ sortReversed }) => {
  return (
    <svg
      style={
        sortReversed
          ? { transform: "scale(1.1)" }
          : { transform: "scale(1.1) rotate(180deg)" }
      }
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 576 512"
    >
      <path d="M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 480h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32z" />
    </svg>
  );
};
const ChevronDownIcon = ({ id }) => {
  return (
    <svg
      className="chevron"
      id={"chevron" + id}
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
    >
      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
    </svg>
  );
};
const Search = ({
  list,
  search,
  page,
  searchText,
  changePage,
  region,
  filterByRegion,
  setSort,
  sort,
  sortReversed,
  setReversed,
  setItemsPerPage,
  itemsPerPage,
  setCountryMain,
}) => {
  const toggleClassName = (elementId, className, groupClassName) => {
    const elements = document.querySelectorAll("." + groupClassName);
    console.log(elements);
    const element = document.getElementById(elementId);

    const hasClass = element.classList.contains(className);
    if (groupClassName === "filter-list") {
      elements.forEach((element) => {
        element.classList.add("none");
      });
    } else {
      elements.forEach((element) => {
        element.classList.remove("rotate");
      });
    }

    if (element) {
      if (hasClass) {
        element.classList.remove(className);
      } else {
        element.classList.add(className);
      }
    }
  };

  const numberOfPages = Math.ceil(list.length / itemsPerPage);
  let pagination = [];
  if (page + 1 < 5) {
    for (let i = 0; i < Math.min(numberOfPages, 7); i++) {
      pagination.push(i + 1);
    }
    if (numberOfPages > 7) {
      pagination.splice(5, 7);
      pagination.push("...");
      pagination.push(numberOfPages);
    }
  } else if (page > numberOfPages - 5) {
    pagination.push(1);

    pagination.push("...");
    for (let i = 0; i < 5; i++) {
      pagination.push(numberOfPages - 4 + i);
    }
  } else {
    pagination = [1, "...", page, page + 1, page + 2, "...", numberOfPages];
  }
  const handleClick = (pageItem) => {
    changePage(pageItem - 1);
  };
  const elemento = document.getElementById("body"); //

  const valorVariableCSS =
    getComputedStyle(elemento).getPropertyValue("--pagination-color");

  return (
    <section className="search-box">
      <div className="filter-panel">
        <div className="input-box">
          <SearchIcon />
          <input
            value={searchText}
            onChange={search}
            placeholder="Search for a country..."
            className="search-input"
            type="text"
          />
        </div>
        <div className="filter-right">
          <div className="filter-right1">
            <div
              style={sort === "Sort" ? { display: "none" } : null}
              onClick={() => setReversed()}
              className="filter-box order-box"
            >
              <SortIcon sortReversed={sortReversed} />
            </div>
            <div
              onClick={() => {
                toggleClassName("items-number-list", "none", "filter-list");
                toggleClassName("chevron3", "rotate", "chevron");
              }}
              className="filter-box items-number-box"
            >
              {itemsPerPage}
              <ChevronDownIcon id="3" />
              <ul
                id="items-number-list"
                className="none filter-list items-number-list"
              >
                <li onClick={() => setItemsPerPage(8)}>8</li>
                <li onClick={() => setItemsPerPage(16)}>16</li>
                <li onClick={() => setItemsPerPage(24)}>24</li>

                <li onClick={() => setItemsPerPage(32)}>32</li>
              </ul>
            </div>
            <div
              onClick={() => {
                toggleClassName("filter-sort-list", "none", "filter-list");
                toggleClassName("chevron2", "rotate", "chevron");
              }}
              className="filter-box sort-box"
            >
              {sort}
              <ChevronDownIcon id="2" />
              <ul id="filter-sort-list" className="none filter-list sort-list">
                <li onClick={() => setSort("Sort")}>Sort</li>
                <li onClick={() => setSort("A-Z")}>A-Z</li>
                <li onClick={() => setSort("Population")}>Population</li>
              </ul>
            </div>
          </div>
          <div
            onClick={() => {
              toggleClassName("filter-region-list", "none", "filter-list");
              toggleClassName("chevron1", "rotate", "chevron");
            }}
            className="filter-box region-box"
          >
            {region}
            <ChevronDownIcon id="1" />
            <ul
              id="filter-region-list"
              className="none filter-list region-list"
            >
              <li onClick={() => filterByRegion("All")}>All</li>
              <li onClick={() => filterByRegion("Africa")}>Africa</li>
              <li onClick={() => filterByRegion("Americas")}>America</li>
              <li onClick={() => filterByRegion("Asia")}>Asia</li>
              <li onClick={() => filterByRegion("Europe")}>Europe</li>
              <li onClick={() => filterByRegion("Oceania")}>Oceania</li>
            </ul>
          </div>
        </div>
      </div>
      <motion.div className="countries-grid">
        <AnimatePresence>
          {list
            .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
            .map((country, index) => (
              <Country
                arrayIndex={country.arrayIndex}
                setCountryMain={setCountryMain}
                name={country.name.common}
                key={country.area}
                alt={country.flags.alt}
                flag={country.flags.png}
                population={country.population}
                region={country.region}
                capital={
                  Array.isArray(country.capital) ? country.capital[0] : null
                }
              />
            ))}
        </AnimatePresence>
      </motion.div>
      <div className="pagination">
        <button
          onClick={() => {
            changePage(Math.max(0, page - 1));
            window.scrollTo(0, 0);
          }}
          className="pagination-btn"
        >
          &lt;
        </button>
        {pagination.map((pageItem, key) => (
          <button
            key={key}
            onClick={pageItem !== "..." ? () => handleClick(pageItem) : null}
            style={
              pageItem === page + 1
                ? { backgroundColor: valorVariableCSS }
                : null
            }
            className="pagination-btn"
          >
            {pageItem}
          </button>
        ))}

        <button
          onClick={() => {
            changePage(Math.min(numberOfPages - 1, page + 1));
            window.scrollTo(0, 0);
          }}
          className="pagination-btn"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};
export default Search;
