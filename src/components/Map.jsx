import React, {Component} from "react"

class Map extends Component {
	initMap() {
		var directionsService = new google.maps.DirectionsService;
		var directionsDisplay = new google.maps.DirectionsRenderer;
		var displayMap = new google.maps.Map(document.getElementById('view-map'), {
			zoom: 6,
			center: {lat: 41.85, lng: -87.65}
		});
		directionsDisplay.setMap(displayMap);
		calculateAndDisplayRoute(directionsService, directionsDisplay)
	}

	calculateAndDisplayRoute(directionsService, directionsDisplay) {
		const mapJSON = document.getElementById("map-object").value;
		const mapObject = JSON.parse(mapJSON)
		console.log(mapObject)

		directionsService.route(mapObject.map, function(response, status) {
			if (status === 'OK') {
				directionsDisplay.setDirections(response);
				var route = response.routes[0];
				console.log("response: ", response)
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	}

	render() {
		return (
			<div className="map">
				
			</div>
		)
	}
}

export default Map