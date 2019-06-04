import React, {Component} from "react"
import { getOneMap } from "../api/apiHandler"
import DisplayMap from "../components/Map"

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
			route: this.calculateRoute(directionsService, thisMap.map)
		})
	}

	calculateRoute( service, object ) {
		service.route(object, function(response, status) {
			if (status === 'OK') {
				console.log("response: ", response)
				return response
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	}

	render() {
		console.log("map page state:, ", this.state)
		return (
			<div className="body-container">
				<DisplayMap map={this.state.map} 
					loadingElement = {<div style={{ height: `100%` }} />}
					containerElement= {<div style={{ height: `400px` }} />}
					mapElement= {<div style={{ height: `100%` }} />}
				/>
				{this.state.map && 
				<div className="mapInfo">
					Total Time: {this.state.map.total_time}
				</div>}
			</div>
		)
	}
}

export default ViewMap