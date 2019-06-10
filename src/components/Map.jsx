import React, {Component} from "react"
import { withGoogleMap, GoogleMap, DirectionsRenderer, Marker, InfoWindow } from "react-google-maps"
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
// import InfoBox from "react-google-maps/lib/components/addons/InfoBox";

var directionsService = new window.google.maps.DirectionsService();
var new_route = null;
var count = 0;

class DisplayMap extends Component { 
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

	componentDidUpdate(prevProps, prevState) {
		if (this.props.map !== prevProps.map && count < 1) {
			this.calculateRoute(directionsService, this.props.map)
			.then( res => {
				if (this.props.type === "view") {
					console.log("here i am, updating the count")
					count ++
				}
				this.setState({
					route : new_route
				}, () => this.props.updateTime(new_route))
			}
			)
		}
  }

	calculateRoute( service, object) {
		return new Promise((resolve, reject) => {
			service.route(object, function(response, status) {
				if (status === 'OK') {
					console.log("route response: ", response)
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
			isOpen: false,
		}));
		// const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

		this.setState({
			// center: nextCenter,
			markers: nextMarkers,
			places : places
		});

		this.state.refs.map.fitBounds(bounds);
	}

	onMarkerClick = (index, marker) => {
		const markersList = this.state.markers
		const openMarker = {
			position: marker.position,
			isOpen: !marker.isOpen,
		}

		markersList[index] = openMarker
		this.setState({
			markers: markersList
		})
	}


	render() {
		// console.log("display map props: ", this.props)
		// console.log("display map state: ", this.state)
		return(
			<div className="mapWithSearch">
				<GoogleMap
					ref={this.onMapMounted}
					defaultZoom={8}
					defaultCenter={{ lat: -34.397, lng: 150.644 }}
					onBoundsChanged={this.onBoundsChanged}
				>
					{this.state.route && <DirectionsRenderer directions={this.state.route} />}
					{this.props.type === "create" && 
					<SearchBox
						ref={this.onSearchBoxMounted}
						bounds={this.state.bounds}
						controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
						onPlacesChanged={this.onPlacesChanged}
					>
						<input
						type="text"
						placeholder="Find Places"
						className="searchInput"
					/>
					</SearchBox>}
					{this.state.markers.map((marker, index) =>
						<Marker key={index} position={marker.position} onClick={()=> this.onMarkerClick(index, marker)}>
							{marker.isOpen && <InfoWindow onCloseClick={()=>this.onMarkerClick(index, marker)}>
								<div>
								{this.state.places[index].name}
								{this.state.places[index].formatted_address}
								{this.props.type === "create" && <button className="addStop" onClick={() => this.props.addStop(this.state.places[index])}>Add Stop</button>}
								</div>
							</InfoWindow>}
						</Marker>
					)}
				</GoogleMap>
			</div>

	)}
}

export const WrappedMap = withGoogleMap(DisplayMap)