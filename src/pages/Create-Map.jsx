import React, {Component} from "react"
import { WrappedMap } from "../components/Map"
import DraggableList from "../components/DraggableList"
import SortList from "../components/SortList"
import arrayMove from 'array-move';


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
			placeNames: [],
			total_time: 0,
		}
	}

	onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({placeNames}) => ({
      placeNames: arrayMove(placeNames, oldIndex, newIndex),
    }));
  };

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

		var place_names = this.state.placeNames
		// place_names.push({id: place_names.length +1, text: place.name, })
		place_names.push(place.name)

		this.setState({
			places : new_places,
			placeNames : place_names
		}, () => {
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

	placesChanged = () => {
		console.log("changed")
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
				<ul className="placesList" onChange={this.placesChanged}>
					{this.state.places.length > 0 && this.state.places.map((place, index) => 
						<li key={index} className="placeItem">
							<p>{place.name}</p>
							<span className="removePlace" onClick={()=> this.removePlaceFromRoute(index)}>X</span>
						</li>
					)}
				</ul>

				<div>Total Walking Time: {this.state.total_time} min</div>
				<label>Guide Notes:</label>
				<textarea value="what should people know about your map?" cols="30" rows="10" onChange={(e) => this.updateGuideNotes(e)} />
				<button className="createButton">Submit</button>
				</form>
				
				<SortList items={this.state.placeNames} onSortEnd={this.onSortEnd} />
				{/* <DraggableList places={this.state.placeNames} /> */}
			</div>
		)
	}
}

export default CreateMap