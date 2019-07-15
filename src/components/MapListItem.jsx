import React, {Component} from "react"
// import { Link } from "react-router-dom";

class mapItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

	render() {
		return (
			<div className="listItem">
				<div className="listImage">
					<img src={this.props.image} alt="map-route" />
					<div className="listDetails">
						<div className="listTime">
							<i className="emphasis">{this.props.total_time} min.</i>
							<i className="far fa-heart">{this.props.total_favorites}</i>
						</div>
						<div className="listActions">
							<i className="far fa-bookmark fa-lg"></i>
							<i className="fas fa-bookmark fa-lg"></i>
						</div>
					</div>
				</div>
				<div className="listInfo">
					<div className="location">
							<div className="listCity">{this.props.city}</div>
							<div className="listNeighborhood">{this.props.neighborhood}</div>
					</div>
					<div className="details">
							<div className="listKey">Total stops: <span className="listValue">{this.props.total_stops}</span></div>
							{/* <div className="listKey">Places visited: <span className="listValue">{this.props.places}</span></div> */}
					</div>
					{/* <div className="userDetails">
						<span className="listKey">Creator: <span className="listValue"><a href="#">{this.props.user.username}</a></span></span>, 
						{this.props.created_at}
					</div> */}
				</div>
			</div>
		)
	}
}

export default mapItem;