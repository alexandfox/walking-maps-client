import React, {Component} from "react"
import { WrappedMap } from "../components/Map"
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";

class CreateMap extends Component {
	constructor(props) {
		super(props)
		this.state = {
			refs : {},
			places : [],
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

	onSearchBoxMounted = (ref) => {
		this.state.refs.searchBox = ref;
	}

	onPlacesChanged = () => {
		const new_places = this.state.refs.searchBox.getPlaces();

		this.setState({
			places : new_places
		});
	}

	render() {
		return (
			<div className="body-container">
				<StandaloneSearchBox 
					ref={this.onSearchBoxMounted}
					// bounds={this.props.bounds}
					onPlacesChanged={this.onPlacesChanged}
					>
						<input
							className="mapSearch"
							type="text"
							placeholder="Customized your placeholder"
						/>
				</StandaloneSearchBox>
				<WrappedMap 
					loadingElement = {<div style={{ height: `100%` }} />}
					containerElement= {<div className="mapContainer" />}
					mapElement= {<div className="map" map={this.state.map.map} />}
				/>
				<ol>
					{this.state.places.map(({ place_id, formatted_address, geometry: { location } }) =>
						<li key={place_id}>
							{formatted_address}
							{" at "}
							({location.lat()}, {location.lng()})
						</li>
					)}
				</ol>
			</div>
		)
	}
}

export default CreateMap