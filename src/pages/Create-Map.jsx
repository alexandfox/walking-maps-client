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
				<WrappedMap 
					loadingElement = {<div style={{ height: `100%` }} />}
					containerElement= {<div className="mapContainer" />}
					mapElement= {<div className="map" map={this.state.map.map} />}
					type="create"
				/>
				<form action="" className="createForm">
				<label>Route: </label>
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