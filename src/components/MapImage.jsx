import React, {Component} from "react"
import { withGoogleMap, GoogleMap, DirectionsRenderer, Marker, InfoWindow } from "react-google-maps"

var directionsService = new window.google.maps.DirectionsService();
var new_route = null;
var count = 0;

var paths = "&path=color:0xff0000ff|weight:5";
var geocoder = new google.maps.Geocoder();


class MapImage extends Component { 
	constructor(props) {
		super(props)
		this.state = {
			bounds: new window.google.maps.LatLngBounds(),
			center: {
				lat: 41.9, lng: -87.624
			},
			route : [],
			map : {},
			refs : {},
			places : [],
			markers : [],
		}
	}

	createImageFromMap(newMap) {
		getPlaceIDs(cols).then((placeIDs) => {
			console.log(placeIDs)
			updateURL(placeIDs).then(urls => {
				imageURL += paths;
				newMap.image = imageURL;
				newMap.city = city;
				console.log("newMap: ", newMap)
			})
		})
	}

	getPlaceIDs(cols) {
    var placeIDs = [];
    return new Promise((res, rej) => {
      cols.forEach((col, index, array) => {
        placeId = col.getAttribute("id")
        placeIDs.push(placeId)
        if (index == array.length - 1) res(placeIDs)
      })
    })
  }

	updateURL(placeIDs) {
    return new Promise((resolve, reject) => {
      function recurs(index) {
        geocodePlaceID(geocoder, placeIDs[index]).then(res => {
          console.log("turn number", index)
          index++;
          if (index < placeIDs.length) recurs(index);
          else {console.log("yay"); return resolve()}
        })
      }
      recurs(0)
    })
  }

	geocodePlaceID(geocoder, placeID) {
    return new Promise((resolve, reject) => {
      geocoder.geocode({ 'placeId': placeID }, function (results, status) {
        if (status === 'OK') {
          var lat = results[0].geometry.location.lat()
          var lng = results[0].geometry.location.lng()
          var latlng = `|${lat}, ${lng}`
          imageURL += latlng
          paths += latlng
          resolve();
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      })
    })
  }

	render() {
		// console.log("display map props: ", this.props)
		// console.log("display map state: ", this.state)
		return(
			<div className="mapImage">
			</div>
	)}
}

export default MapImage