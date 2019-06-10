import React, {Component} from "react"
import { withGoogleMap, GoogleMap, DirectionsRenderer, Marker } from "react-google-maps"
import SearchBox from "react-google-maps/lib/components/places/SearchBox";

var directionsService = new window.google.maps.DirectionsService();
var new_route = null;
var count = 0;

class DisplayMap extends Component { 
	constructor(props) {
		super(props)
		this.state = {
			bounds: null,
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

	componentDidUpdate(prevProps, prevState) {
		if (this.props.type === "view" && !new_route && count < 1) {
			this.calculateRoute(directionsService, this.props.map.map)
			.then( res => {
				// if (new_route && new_route.length > 1) {
				// console.log("new_route var: ", new_route)
				count ++
				this.setState({
					route : new_route
				})
			}
			)
		}
  }

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

	onMapMounted = (ref) => {
		this.state.refs.map = ref;
	}

	onBoundsChanged = () => {
		this.setState({
			bounds: this.state.refs.map.getBounds(),
			center: this.state.refs.map.getCenter(),
		})
	}

	onSearchBoxMounted = (ref) => {
		this.state.refs.searchBox = ref;
	}

	onPlacesChanged = () => {
		const places = this.state.refs.searchBox.getPlaces();
		const bounds = new window.google.maps.LatLngBounds();

		places.forEach(place => {
			if (place.geometry.viewport) {
				bounds.union(place.geometry.viewport)
			} else {
				bounds.extend(place.geometry.location)
			}
		});

		const nextMarkers = places.map(place => ({
			position: place.geometry.location,
		}));
		// const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

		this.setState({
			// center: nextCenter,
			markers: nextMarkers,
			// places : new_places
		});
	}


	render() {
		// console.log("display map props: ", this.props)
		console.log("display map state: ", this.state)
		return(
			<div className="mapWithSearch">
				<GoogleMap
					ref={this.onMapMounted}
					defaultZoom={8}
					defaultCenter={{ lat: -34.397, lng: 150.644 }}
					onBoundsChanged={this.onBoundsChanged}
				>
					{this.state.route && <DirectionsRenderer directions={this.state.route} />}
					{this.props.type === "create" && <SearchBox
						ref={this.onSearchBoxMounted}
						bounds={this.bounds}
						controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
						onPlacesChanged={this.onPlacesChanged}
					>
						<input
						type="text"
						placeholder="Customized your placeholder"
						style={{
							boxSizing: `border-box`,
							border: `1px solid transparent`,
							width: `240px`,
							height: `32px`,
							marginTop: `27px`,
							padding: `0 12px`,
							borderRadius: `3px`,
							boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
							fontSize: `14px`,
							outline: `none`,
							textOverflow: `ellipses`,
						}}
					/>
					</SearchBox>}
					{this.state.markers.map((marker, index) =>
						<Marker key={index} position={marker.position} />
					)}
				</GoogleMap>
			</div>

	)}
}

// export const WrappedMap = withScriptjs(withGoogleMap(DisplayMap))
export const WrappedMap = withGoogleMap(DisplayMap)