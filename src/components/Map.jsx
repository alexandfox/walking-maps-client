import { compose, withProps } from "recompose"
import React, {Component} from "react"
import { withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps"

var directionsService = new window.google.maps.DirectionsService;

class DisplayMap extends Component { 
	constructor(props) {
		super(props)
	}

	render() {
		console.log("display map props: ", this.props)
		return(
			<div className="map">
				<GoogleMap
					defaultZoom={8}
					defaultCenter={{ lat: -34.397, lng: 150.644 }}
				>
					{this.props.map.map && <DirectionsRenderer geocoded_waypoints={this.props.map.map.waypoints} />}
				</GoogleMap>
			</div>
	)}
}

export default DisplayMap