import React, {Component} from "react"
import MapItem from "../components/MapListItem"
import { getAllMaps } from "../api/apiHandler";


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allMaps : [],
    }
  }

  loadMaps() {
    getAllMaps()
      .then(res => {
        this.setState({ 
          allMaps: res.data.maps,
        });
        console.log("get maps res: ", res)
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  componentDidMount() {
    this.loadMaps()
  }

  // RENDER
  render() {
    return (
    <div className="body-container">
			{
				this.state.allMaps.map( (map, index) => (
					<MapItem key={index} {...map} />
				))
			}
    </div>
  )}
}

export default Home