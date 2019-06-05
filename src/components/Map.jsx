import React, {Component} from "react"
import { withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps"

var directionsService = new window.google.maps.DirectionsService;
var new_route = null;
var count = 0;

class DisplayMap extends Component { 
	constructor(props) {
		super(props)
		this.state = {
			route : []
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (!new_route && count < 1) {
			this.calculateRoute(directionsService, this.props.map.map)
			.then( res => {
				// if (new_route && new_route.length > 1) {
				console.log("new_route var: ", new_route)
				count ++
				this.setState({
					route : new_route
				})
			}
			)
		}
  }

	calculateRoute( service, object ) {
		console.log("here i am")
		return new Promise((resolve, reject) => {
			service.route(object, function(response, status) {
				if (status === 'OK') {
					console.log("response: ", response)
					new_route = response.geocoded_waypoints
					console.log("new_route: ", new_route)
					resolve()
					// return response.geocoded_waypoints
				} else {
					window.alert('Directions request failed due to ' + status);
				}
			});
		})
	}

	render() {
		console.log("display map props: ", this.props)
		console.log("display map state: ", this.state)
		return(
			<GoogleMap
				defaultZoom={8}
				defaultCenter={{ lat: -34.397, lng: 150.644 }}
			>
				{this.state.route && <DirectionsRenderer geocoded_waypoints={this.state.route} />}
			</GoogleMap>
	)}
}

export const WrappedMap = withGoogleMap(DisplayMap)