import React, { Component } from "react";
import Map from "./components/Map";
import List from "./components/List";
import akcscLogo from "./img/logo-akcsc.png";
import arlisLogo from "./img/logo-arlis.png";
import nwbLogo from "./img/logo-nwb.png";

class App extends Component {

  doSearch = () => {
    console.log("doing search", this.input.value)
  }


  render() {
    return (
      <div className="container section">
        <h2 className="title">
          Search NWB LCC Boreal Alaska and Canada Bibliography
        </h2>

        <div id="Search">
          <input ref={(i) => {this.input = i}} type="text" />
          <button onClick={this.doSearch}>Search</button>
        </div>

        <div className="columns">
          <div className="column">
            <Map />
          </div>

          <div className="column">
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
              <a target="_blank" href="mailto:benjamin_matheson@fws.gov">
                benjamin_matheson@fws.gov
              </a>{" "}
              with any questions.
            </p>
          </div>
        </div>

        <List />

        <hr />

        <div id="Partners">
          <h3 className="is-size-3">Contributing Partners</h3>
          <div>
            <a href="https://csc.alaska.edu/" target="_blank">
              <img src={akcscLogo} />
            </a>
            <a href="http://nwblcc.org/" target="_blank">
              <img src={nwbLogo} />
            </a>
            <a href="https://www.arlis.org" target="_blank">
              <img src={arlisLogo} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
