import React, {Component} from "react"
import { getOneMap } from "../api/apiHandler"
import { WrappedMap } from "../components/Map"

var directionsService = new window.google.maps.DirectionsService;

class ViewMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			map_id: props.match.params.id,
			map: {},
			route: [],
		};
	}

	async componentDidMount() {
		var thisMap = await getOneMap(this.props.match.params.id)
		thisMap = thisMap.data.map

		this.setState({
			map: thisMap,
		})
	}

	render() {
		// console.log("map page state:, ", this.state)
		var map = this.state.map
		return (
			<div className="body-container">
				<WrappedMap map={this.state.map} 
					loadingElement = {<div style={{ height: `100%` }} />}
					containerElement= {<div style={{ height: `400px` }} />}
					mapElement= {<div style={{ height: `100%` }} />}
				/>
				{this.state.map && 
				<div className="mapInfo">
					Total Time: {map.total_time} min.
					Total Stops: {map.total_stops}
					Neighborhoods: {map.neighborhood}
					Places Visited: {map.places}
					{map.creator && <div>Creator: {map.creator.username}</div>}
					Created: {map.created_at}
					Guide Notes {map.guide_notes}
				</div>
				}

				<div className="mapActions">
					like this map? .... map component
					Open in App
					Clone Map
				</div>
			</div>
		)
	}
}

export default ViewMap