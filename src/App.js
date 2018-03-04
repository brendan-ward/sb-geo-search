import React, { Component } from "react";
import { connect } from "react-redux";
import Map from "./components/Map";
import List from "./components/List";
import { querySB } from "./reducers";
import akcscLogo from "./img/logo-akcsc.png";
import arlisLogo from "./img/logo-arlis.png";
import nwbLogo from "./img/logo-nwb.png";


export const ITEMS_PER_PAGE = 20; //TODO: consider making this a variable
export const SB_FOLDER_ID = '57856a9fe4b0e02680bf7784';


class App extends Component {
  doSearch = () => {
    console.log("doing search", this.input.value);

    const {page} = this.props;

    // TODO: geo search params
    this.props.querySB(this.input.value, page, ITEMS_PER_PAGE);
  };

  handleKeyPress = (e) => {
      if (e.key === "Enter"){
        this.doSearch();
      }
  }

  handlePageClick = (page) => {
      this.props.querySB(this.input.value, page, ITEMS_PER_PAGE);
  }

  renderList() {
    const { items, total, page, isPending, isError } = this.props;
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
    const onPage = this.handlePageClick; // TODO: replace with action

    if (isError) {
      return (
        <div className="alert">
          We're sorry, there was an error retrieving results from ScienceBase.
        </div>
      );
    }

    if (isPending) {
      return <div className="quiet">Loading...</div>;
    }

    if (items === null) return null;

    if (items.length === 0) {
      return <div className="quiet">No items match your query.</div>
    }

    return <List items={items} total={total} page={page} totalPages={totalPages} itemsPerPage={ITEMS_PER_PAGE} onPage={onPage}/>;
  }

  render() {
    return (
      <div className="container section">
        <h2 className="title">
          Search NWB LCC Boreal Alaska and Canada Bibliography
        </h2>

        <div id="Search">
          <input
            ref={i => {
              this.input = i;
            }}
            type="text"
            onKeyPress={e => this.handleKeyPress(e)}
          />
          <button onClick={this.doSearch}>Search</button>
        </div>

        <div className="columns">
          {/* <div className="column">
            <Map />
          </div> */}

          {/* <div className="column">
            <p>
              Explore thousands of curated scholarly articles, state and federal
              resource reports, land management plans, and more in the Northwest
              Boreal Landscape Conservation Cooperative bibliography. When you
              click on an item's name, you can view details for that item in
              ScienceBase.
              <br />
              <br />
              To search, enter what you’re interested in accessing and click
              "Search." To limit the search to your geographic area of interest
              (for example, Kluane National Park or Bonzana Creek LTER), click
              the button on the map to draw a rectangle around the area.
              <br />
              <br />
              Contact{" "}
              <a href="mailto:benjamin_matheson@fws.gov">
                benjamin_matheson@fws.gov
              </a>{" "}
              with any questions.
            </p>
          </div> */}
        </div>

        {this.renderList()}

        <hr />

        {/* <div id="Partners">
          <h3 className="is-size-3">Contributing Partners</h3>
          <div>
            <a
              href="https://csc.alaska.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={akcscLogo} alt="Alaska Climate Science Center logo" />
            </a>
            <a
              href="http://nwblcc.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={nwbLogo}
                alt="Northwest Boreal Landscape Conservation Cooperative logo"
              />
            </a>
            <a
              href="https://www.arlis.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={arlisLogo}
                alt="Alaska Resources Library and Information Services logo"
              />
            </a>
          </div>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { querySB })(App);
