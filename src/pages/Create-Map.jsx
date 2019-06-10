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
			map : {
				origin: null,
				destination: null,
				waypoints: [],
				travelMode: "WALKING",
				optimizeWaypoints: false,
			},
			places: [],
			total_time: 0,
		}
	}

	updateRouteFromPlaces = (stopsArray) => {
		var idArray = []
		// get array of place IDs:
		stopsArray.map((place) => 
			idArray.push({placeId: place.place_id})
		)

		var origin, destination = null, waypoints = [];
		[origin, ...waypoints] = idArray

		if (waypoints.length > 0) {
			destination = waypoints.pop()
			waypoints.map((location, index) => 
				waypoints[index] = {location: waypoints[index]}
			)
		}

		this.setState({
			map: {
				origin,
				destination,
				waypoints,
				travelMode: "WALKING",
				optimizeWaypoints: false,
			}
		})
	}

	addPlaceToRoute = (place) => {
		var new_places = this.state.places 
		new_places.push(place)

		this.setState({
			places : new_places
		}, () => {
			console.log("new_places: ", new_places)
			this.updateRouteFromPlaces(new_places)
		})
	}

	removePlaceFromRoute = (index) => {
		var new_places = this.state.places 
		new_places.splice(index,1)

		this.setState({
			places : new_places
		}, () => this.updateRouteFromPlaces(new_places))
	}

	calculateRouteTime = (route) => {
		var totalTime = 0;
		route.routes[0].legs.forEach(leg => {
			totalTime += leg.duration.value
		})

		// update time display
		var timeInMinutes = Math.round(totalTime / 60)
		console.log("timeInMinutes: ", timeInMinutes)
		this.setState({
			total_time : timeInMinutes,
		})
	}

	updateGuideNotes = (e) => {

	}

	render() {
		// console.log("create map state: ", this.state)
		return (
			<div className="body-container">
				<WrappedMap 
					map={this.state.map}
					loadingElement = {<div style={{ height: `100%` }} />}
					containerElement= {<div className="mapContainer" />}
					mapElement= {<div className="map"/>}
					type="create"
					addStop={this.addPlaceToRoute}
					updateTime={this.calculateRouteTime}
				/>
				<form action="" className="createForm">
				<label>Route: </label>
				<ul className="placesList">
					{this.state.places.length > 0 && this.state.places.map((place, index) => 
						<li key={index} className="placesItem">{place.name}
							<span className="removePlace" onClick={()=> this.removePlaceFromRoute(index)}>X</span>
						</li>
					)}
				</ul>
				<div>Total Walking Time: {this.state.total_time} min</div>
				<label>Guide Notes:</label>
				<textarea value="what should people know about your map?" cols="30" rows="10" onChange={(e) => this.updateGuideNotes(e)} />
				<button className="createButton">Submit</button>
				</form>
				
			</div>
		)
	}
}

export default CreateMap