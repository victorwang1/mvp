import React from 'react';
import $ from 'jquery';
import MapboxGl from '../../dist/mapbox-gl.js';
import Search from './SearchView.js';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      currentLayer: '0',
      restaurants: [],
      filteredRestaurants: []
    }

    this.getRestaurants = this.getRestaurants.bind(this);
    this.mapData = this.mapData.bind(this);
    this.addPlaces = this.addPlaces.bind(this);
    this.filterRestaurants = this.filterRestaurants.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.rerenderWith = this.rerenderWith.bind(this);
  }

  componentWillMount() {
    this.getRestaurants();
  }

  componentDidMount() {
    MapboxGl.accessToken = 'pk.eyJ1IjoidmljdG9yd2FuZzEiLCJhIjoiY2o4MHBucms2MjRxNjMyczY2bzB6NGYwZCJ9.qtN7aewaiR-HFzDILs1XJA';
    var map = new MapboxGl.Map({
      container: this.container,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [-122.41, 37.78],
      zoom: 12
    })
    this.setState({map: map});

    map.on('load', () => {
      this.addPlaces(this.state.map, this.state.restaurants);
    });
  }

  componentWillUpdate() {
    if (this.map) this.rerenderWith(this.state.filteredRestaurants || this.state.restaurants);
  }

  rerenderWith(data) {
    var map = this.state.map;
    map.removeLayer(this.state.currentLayer);
    this.setState({currentLayer: String(Number(this.state.currentLayer) + 1)}, () => {
      this.addPlaces(this.state.map, data);
    })
  }

  clearSearch() {
    this.rerenderWith(this.state.restaurants);
  }

  getRestaurants() {
    $.ajax({
      url: '/restaurants',
      dataType: 'json'
    })
     .done(data => {this.setState({restaurants: data.businesses})})
     .fail(err => console.log(err)) ;
  }

  filterRestaurants(keyword) {
    this.setState({filteredRestaurants: this.state.restaurants.filter(restaurant => {
      return restaurant.categories.some(category => category.alias.includes(keyword));
    })}, () => {
      console.log(this.state.filteredRestaurants);
      this.rerenderWith(this.state.filteredRestaurants);
    });
  }

  mapData(data) {
    return { "type": "Feature",
             "geometry": {
               "type": "Point",
               "coordinates": [data.coordinates.longitude, data.coordinates.latitude]
             },
             "properties": {
               "title": data.categories[0].title,
               "icon": "restaurant"
             }
           }
  }

  addPlaces(map, dataArray) {
    map.addLayer({
        "id": this.state.currentLayer,
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": dataArray.map((data) => this.mapData(data))
            }
        },
        "layout": {
            "icon-image": "{icon}-15",
            "text-field": "{title}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top"
        },
        "paint": {
          "text-color": "white"
        }
    })
  }

  render() {
    return (
      <div>
        <Search filterRestaurants={this.filterRestaurants} clearSearch={this.clearSearch} />
        <div className='Map' ref={(x) => { this.container = x }}></div>
      </div>
    )
  }
}

export default Map;
