import React, {Component} from "react"
import { getOneMap } from "../api/apiHandler"

class ViewMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			map_id: props.match.params.id,
			map: {},
		};
	}

	async componentDidMount() {
		var thisMap = await getOneMap(this.props.match.params.id)
		thisMap = thisMap.data.map
		this.setState({
			map: thisMap
		})
	}

	render() {
		console.log("map page state:, ", this.state)
		return (
			<div className="body-container">
				{this.state.map && 
				<div className="mapInfo">
					Total Time: {this.state.map.total_time}
				</div>}
			</div>
		)
	}
}

export default ViewMap