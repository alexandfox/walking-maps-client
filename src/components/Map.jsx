import { compose, withProps } from "recompose"
import React, {Component} from "react"
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps"

const Map = compose(
	withProps({
					googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBAFajUxQ7Ltv5t9nfiaYTXvhnWbTV80bk&libraries=places",
					loadingElement: <div style={{ height: `100%` }} />,
					containerElement: <div style={{ height: `400px` }} />,
					mapElement: <div style={{ height: `100%` }} />}),
	withGoogleMap)((props) => 
	{
		return(
			<div className="map">
				<GoogleMap
					defaultZoom={8}
					defaultCenter={{ lat: -34.397, lng: 150.644 }}
				>
				</GoogleMap>
			</div>
	)})


export default Map