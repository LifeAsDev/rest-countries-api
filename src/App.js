import "./App.css";
import React, { Component } from "react";
import Search from "./Search";
import CountryMain from "./CountryMain";
const ThemeIcon = ({ dark }) => {
  if (dark) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 384 512"
      >
        <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
      </svg>
    );
  } else {
    return (
      <svg
        className="light"
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 384 512"
      >
        <path d="M0 256L28.5 28c2-16 15.6-28 31.8-28H228.9c15 0 27.1 12.1 27.1 27.1c0 3.2-.6 6.5-1.7 9.5L208 160H347.3c20.2 0 36.7 16.4 36.7 36.7c0 7.4-2.2 14.6-6.4 20.7l-192.2 281c-5.9 8.6-15.6 13.7-25.9 13.7h-2.9c-15.7 0-28.5-12.8-28.5-28.5c0-2.3 .3-4.6 .9-6.9L176 288H32c-17.7 0-32-14.3-32-32z" />
      </svg>
    );
  }
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      finalList: [],
      search: "",
      page: 0,
      region: "All",
      sort: "Sort",
      sortReversed: false,
      itemsPerPage: 8,
      countryMain: -1,
      dark: false,
    };
  }
  toggleTheme = () => {
    this.setState((prevState) => {
      document
        .querySelector("body")
        .setAttribute("data-theme", !prevState.dark ? "light" : "dark");
      return { dark: !prevState.dark };
    });
  };
  setCountryMain = (countryMain) => {
    this.setState({ countryMain });
  };
  changePage = (page) => {
    this.setState({ page });
  };
  setItemsPerPage = (itemsPerPage) => {
    this.setState({ page: 0, itemsPerPage });
  };
  setSort = (sort) => {
    let filteredCountries = this.filterList(
      this.state.region,
      this.state.search,
      sort
    );

    this.setState({ page: 0, finalList: filteredCountries, sort });
  };
  filterList = (
    region,
    search,
    sort = this.state.sort,
    sortReversed = this.state.sortReversed
  ) => {
    const filterList = [...this.state.list];
    let filteredCountries = [...filterList];

    if (region !== "All") {
      filteredCountries = filterList.filter(
        (country) => country.region === region
      );
    }
    filteredCountries = filteredCountries.filter(
      (country) =>
        country.name.common.toUpperCase().indexOf(search.toUpperCase()) >= 0
    );
    if (sort !== "Sort") {
      if (sort === "A-Z") {
        filteredCountries.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
      }
      if (sort === "Population") {
        filteredCountries.sort((a, b) => a.population - b.population);
      }
    }
    if (sortReversed) {
      filteredCountries.reverse();
    }
    return filteredCountries;
  };
  setReversed = () => {
    this.setState((prevState) => {
      let filteredCountries = this.filterList(
        this.state.region,
        this.state.search,
        this.state.sort,
        !prevState.sortReversed
      );
      return {
        page: 0,
        finalList: filteredCountries,
        sortReversed: !prevState.sortReversed,
      };
    });
  };
  filterByRegion = (region) => {
    let filteredCountries = this.filterList(region, this.state.search);
    this.setState({
      page: 0,
      finalList: filteredCountries,
      region,
    });
  };
  search = (event) => {
    let filteredCountries = this.filterList(
      this.state.region,
      event.target.value
    );
    this.setState({
      page: 0,
      finalList: filteredCountries,
      search: event.target.value,
    });
  };
  componentDidMount() {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const updatedData = data.map((element, index) => {
          return { ...element, arrayIndex: index };
        });
        this.setState({ list: updatedData, finalList: updatedData });
      });
  }
  render() {
    //console.log(this.state.finalList);
    return (
      <div className="App">
        <nav id="nav">
          <p
            onClick={() =>
              this.setCountryMain(
                Math.min(this.state.countryMain + 1, this.state.list.length - 1)
              )
            }
            className="tittle"
          >
            Where in the world?
          </p>
          <div onClick={this.toggleTheme} className="theme-box">
            <ThemeIcon dark={this.state.dark} />
            {!this.state.dark ? "Light Mode" : "Dark Mode"}
          </div>
        </nav>
        {this.state.countryMain === -1 ? (
          <Search
            itemsPerPage={this.state.itemsPerPage}
            setItemsPerPage={this.setItemsPerPage}
            sortReversed={this.state.sortReversed}
            sort={this.state.sort}
            setSort={this.setSort}
            filterByRegion={this.filterByRegion}
            region={this.state.region}
            changePage={this.changePage}
            page={this.state.page}
            search={this.search}
            searchText={this.state.search}
            list={this.state.finalList}
            setReversed={this.setReversed}
            setCountryMain={this.setCountryMain}
          />
        ) : (
          <CountryMain
            countryMain={this.state.list[this.state.countryMain]}
            setCountryMain={this.setCountryMain}
            list={this.state.list}
          />
        )}
      </div>
    );
  }
}

export default App;
