import React, {Component} from "react"
import MapItem from "../components/MapListItem"

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  // RENDER
  render() {
    return (
    <div className="body-container">
			{
				this.state.filteredMaps.map( (map, index) => (
					<MapItem key={index} {...map} />
				))
			}
    </div>
  )}
}

export default Home