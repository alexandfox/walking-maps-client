import React, {Component} from "react"
import { WrappedMap } from "../components/Map"

class CreateMap extends Component {
	constructor(props) {
		super(props)
		this.state = {
			map : {
				map: {},
				creator: null,
				image: "",
				city: "",
				neighborhood: [],
				places: [],
				total_stops: null,
				total_time: null,
				favorites: [],
				total_favorites: 0,
				tags: [],
				clone_from: {},
				number_of_clones: 0,
				clones: [],
				local_rank: 0,
				global_rank: 0,
				guide_notes: "",
				place_notes: [],
				comments: [],
			},
		}
	}

	render() {
		return (
			<div className="body-container">
				{/* <SearchBox
					ref={this.onSearchBoxMounted}
					// bounds={this.bounds}
					controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
					onPlacesChanged={this.onPlacesChanged}
				>
				</SearchBox> */}
				<WrappedMap 
					// googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBAFajUxQ7Ltv5t9nfiaYTXvhnWbTV80bk&libraries=places"
					loadingElement = {<div style={{ height: `100%` }} />}
					containerElement= {<div className="mapContainer" />}
					mapElement= {<div className="map" map={this.state.map.map} />}
					type="create"
				/>
				{/* <ol>
					{this.state.places.map(({ place_id, formatted_address, geometry: { location } }) =>
						<li key={place_id}>
							{formatted_address}
							{" at "}
							({location.lat()}, {location.lng()})
						</li>
					)}
				</ol> */}
			</div>
		)
	}
}

export default CreateMap