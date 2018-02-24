import React, { Component } from "react";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

class Map extends Component {
  constructor(props) {
    super(props);

    this._mapNode = null;
    this.map = null;
  }

  componentDidMount() {
    const mapParams = {
      zoom: 4,
      center: [65.84, -145.0186],
      minZoom: 1,
      maxZoom: 18,
      scrollwheel: false,
      attributionControl: false,
      zIndex: 1,
      layers: [
        L.tileLayer(
          "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmN3YXJkIiwiYSI6InJ5NzUxQzAifQ.CVyzbyOpnStfYUQ_6r8AgQ"
        )
      ]
    };

    let map = (this.map = L.map(this._mapNode, mapParams));

    // disable scroll to prevent scroll hijacking
    // TODO: enable on first click on map
    map.scrollWheelZoom.disable();

    window.map = map; // make it a global for easier debugging

    map.zoomControl.setPosition("topright");

    // add attribution required by MapBox
    let credits = L.control.attribution().addTo(map);
    credits.addAttribution(
      '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
    );
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  render() {
    // console.log('map render', this.props);
    return (
      <div>
        <div ref={node => (this._mapNode = node)} className="map-container" />
      </div>
    );
  }
}


export default Map;
