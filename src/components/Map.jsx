import React, {Component} from "react"
import { withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps"

var directionsService = new window.google.maps.DirectionsService;

class DisplayMap extends Component { 
	constructor(props) {
		super(props)
		this.state = {
			route : []
		}
	}

	componentDidUpdate(prevProps, prevState) {
		var new_route = null;
		new_route = this.calculateRoute(directionsService, this.props.map.map);

		// if (this.props.map !== prevProps.map) {
			

    if (new_route) {
				this.setState({
					route : this.calculateRoute(directionsService, this.props.map.map)
				}, () => console.log("state again: ", this.state))
    }
  }

	calculateRoute( service, object ) {
		console.log("here i am")
		service.route(object, function(response, status) {
			if (status === 'OK') {
				console.log("response: ", response)
				console.log("response.geocoded_waypoints: ", response.geocoded_waypoints)

				return response.geocoded_waypoints
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
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