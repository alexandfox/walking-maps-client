import React, {Component} from "react"
import { WrappedMap } from "../components/Map"
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";

class CreateMap extends Component {
	render() {
		return (
			<div className="body-container">
				<StandaloneSearchBox 
					// ref={props.onSearchBoxMounted}
					bounds={this.props.bounds}
					// onPlacesChanged={props.onPlacesChanged}
					>
						<input
							className="mapSearch"
							type="text"
							placeholder="Customized your placeholder"
						/>
				</StandaloneSearchBox>
				<WrappedMap 
					loadingElement = {<div style={{ height: `100%` }} />}
					containerElement= {<div className="mapContainer" />}
					mapElement= {<div className="map" />}
				/>
			</div>
		)
	}
}

export default CreateMap