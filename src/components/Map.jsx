import React, {Component} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import leafletDraw from 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import {MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM} from '../config';

class Map extends Component {
  constructor(props) {
    super(props);

    this._mapNode = null;
    this.map = null;
  }

  componentDidMount() {
    const mapParams = {
      zoom: MAP_DEFAULT_ZOOM,
      center: MAP_DEFAULT_CENTER,
      minZoom: 1,
      maxZoom: 18,
      scrollwheel: false,
      attributionControl: false,
      drawControlTooltips: false, // hide the tooltips, they are in the way
      zIndex: 1,
      layers: [
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
        })
      ]
    };

    let map = (this.map = L.map(this._mapNode, mapParams));

    // disable scroll to prevent scroll hijacking
    // TODO: enable on first click on map
    map
      .scrollWheelZoom
      .disable();

    window.map = map; // make it a global for easier debugging

    map
      .zoomControl
      .setPosition("topright");

    // add attribution required by MapBox let credits =
    // L.control.attribution().addTo(map); credits.addAttribution(   '© <a
    // href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a
    // href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a
    // href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this
    // map</a></strong>' );

    let drawing = new L.FeatureGroup();
    map.addLayer(drawing);
    window.layer = drawing;
    var drawControl = new L
      .Control
      .Draw({
        draw: {
          polygon: false,
          polyline: false,
          marker: false,
          circle: false,
          circlemarker: false
        },
        edit: {
          edit: false,
          featureGroup: drawing
        }
      });
    map.addControl(drawControl);

    map.on('draw:created', (e) => {
      const layer = e.layer;
      drawing.addLayer(layer);
      const bounds = layer.getBounds();

      // return bounds in format expected by ScienceBase: [[xmin, ymin], [xmax, ymax]]
      this
        .props
        .onSetExtent([
          [
            bounds.getWest(),
            bounds.getSouth()
          ],
          [
            bounds.getEast(),
            bounds.getNorth()
          ]
        ])
    });
    map.on('draw:drawstart', () => {
      drawing.clearLayers();
      this
        .props
        .onSetExtent(null);
    });
    map.on('draw:deletestart', () => {
      drawing.clearLayers();
      this
        .props
        .onSetExtent(null);
    });
  }

  componentWillUnmount() {
    if (this.map) {
      this
        .map
        .remove();
      this.map = null;
    }
  }

  render() {
    return (
      <div>
        <div ref={node => (this._mapNode = node)} className="map-container"/>
      </div>
    );
  }
}

export default Map;
