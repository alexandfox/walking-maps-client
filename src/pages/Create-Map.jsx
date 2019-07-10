import React, {Component} from "react"
import { WrappedMap } from "../components/Map"
import SortList from "../components/SortList"
import arrayMove from 'array-move';


class CreateMap extends Component {
	constructor(props) {
		super(props)
		this.state = {
			creator: null,
			image: "",
			city: "",
			neighborhood: [],
			total_stops: null,
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

	onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({places}) => ({
      places: arrayMove(places, oldIndex, newIndex),
    })
		, () => this.updateRouteFromPlaces());
  };

	// onSortChange = 

	updateRouteFromPlaces = () => {
		var idArray = []
		// get array of place IDs:
		this.state.places.map((place) => 
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
			places : new_places,
		}, () => {
			this.updateRouteFromPlaces(new_places)
		})
	}

	removePlaceFromRoute = (index) => {
		var new_places = this.state.places 
		new_places.splice(index,1)

		this.setState({
			places : new_places
		}, () => this.updateRouteFromPlaces())
	}

	calculateRouteTime = (route) => {
		var totalTime = 0;
		route.routes[0].legs.forEach(leg => {
			totalTime += leg.duration.value
		})

		// update time display
		var timeInMinutes = Math.round(totalTime / 60)
		this.setState({
			total_time : timeInMinutes,
		})
	}

	updateGuideNotes = (e) => {

	}

	onSubmit = (e) => {
		e.preventDefault()

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

				<SortList items={this.state.places} onSortEnd={this.onSortEnd} removePlace={this.removePlaceFromRoute} useDragHandle distance={1}/>

				<div>Total Walking Time: {this.state.total_time} min</div>
				<label>Guide Notes:</label>
				<textarea value="what should people know about your map?" cols="30" rows="10" onChange={(e) => this.updateGuideNotes(e)} />
				<button onClick={this.onSubmit} className="createButton">Submit</button>
				</form>

			</div>
		)
	}
}

export default CreateMap