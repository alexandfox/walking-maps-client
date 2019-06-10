import React, {Component} from "react"
import { WrappedMap } from "../components/Map"

class CreateMap extends Component {
	constructor(props) {
		super(props)
		this.state = {
			// map : {
			// 	map: {},
			// 	creator: null,
			// 	image: "",
			// 	city: "",
			// 	neighborhood: [],
			// 	places: [],
			// 	total_stops: null,
			// 	total_time: null,
			// 	favorites: [],
			// 	total_favorites: 0,
			// 	tags: [],
			// 	clone_from: {},
			// 	number_of_clones: 0,
			// 	clones: [],
			// 	local_rank: 0,
			// 	global_rank: 0,
			// 	guide_notes: "",
			// 	place_notes: [],
			// 	comments: [],
			// },
			map : {},
			places: [],
		}
	}

	addPlaceToRoute = (place) => {
		var new_places = this.state.places 
		new_places.push(place)

		this.setState({
			places : new_places
		}, () => console.log("new places added: ", place))
	}

	render() {
		return (
			<div className="body-container">
				<WrappedMap 
					loadingElement = {<div style={{ height: `100%` }} />}
					containerElement= {<div className="mapContainer" />}
					mapElement= {<div className="map" map={this.state.map} />}
					type="create"
					addStop={this.addPlaceToRoute}
				/>
				<form action="" className="createForm">
				<label>Route: </label>
				<ul className="placesList">
					{this.state.places.length > 0 && this.state.places.map((place, index) => 
						<li key={index} className="placesItem">{place}</li>
					)}
				</ul>
				<label>Total Walking Time: min</label>
				<label>Guide Notes:</label>
				<textarea cols="30" rows="10">
					what should people know about your map?
				</textarea>
				<button className="createButton">Submit</button>
				</form>
				
			</div>
		)
	}
}

export default CreateMap