import React, {Component} from "react"
import { withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps"
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";


var directionsService = new window.google.maps.DirectionsService();
var new_route = null;
var count = 0;

class DisplayMap extends Component { 
	constructor(props) {
		super(props)
		this.state = {
			route : [],
			map : {},
		}
	}

	// componentDidUpdate(prevProps, prevState) {
	// 	if (!new_route && count < 1) {
	// 		this.calculateRoute(directionsService, this.props.map.map)
	// 		.then( res => {
	// 			// if (new_route && new_route.length > 1) {
	// 			// console.log("new_route var: ", new_route)
	// 			count ++
	// 			this.setState({
	// 				route : new_route
	// 			})
	// 		}
	// 		)
	// 	}
  // }

	calculateRoute( service, object ) {
		return new Promise((resolve, reject) => {
			service.route(object, function(response, status) {
				if (status === 'OK') {
					// console.log("response: ", response)
					new_route = response
					resolve()
					// return response.geocoded_waypoints
				} else {
					window.alert('Directions request failed due to ' + status);
				}
			});
		})
	}

	render() {
		// console.log("display map props: ", this.props)
		// console.log("display map state: ", this.state)
		return(
			<div className="mapWithSearch">
				<GoogleMap
					defaultZoom={8}
					defaultCenter={{ lat: -34.397, lng: 150.644 }}
					mapTypeControl={false}
				>
					{this.state.route && <DirectionsRenderer directions={this.state.route} />}
				</GoogleMap>
			</div>

	)}
}

export const WrappedMap = withGoogleMap(DisplayMap)