import React, {Component} from "react"
import { Link } from "react-router-dom";

class mapItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

	render() {
		return (
			<div class="listItem">
				<div class="listImage">
					<a href="/map/{{this._id}}"><img src="{{ this.image}}" /></a>
					<div class="listDetails">
						<div class="listTime">
							<i class="emphasis">{this.total_time} min.</i>
							<i class="far fa-heart">{this.total_favorites}</i>
						</div>
						<div class="listActions">
							<i class="far fa-bookmark fa-lg"></i>
							<i class="fas fa-bookmark fa-lg"></i>
						</div>
					</div>
				</div>
				<div class="listInfo">
					<div class="location">
							<div class="listCity">{this.city}</div>
							<div class="listNeighborhood">{this.neighborhood}</div>
					</div>
					<div class="details">
							<div class="listKey">Total stops: <span class="listValue">{this.total_stops}</span></div>
							<div class="listKey">Places visited: <span class="listValue">{this.places}</span></div>
					</div>
					<div class="userDetails">
						<span class="listKey">Creator: <span class="listValue"><a href="#">{this.user.username}</a></span></span>, 
						{this.created_at}
					</div>
				</div>
			</div>
		)
	}
}

export default mapItem;