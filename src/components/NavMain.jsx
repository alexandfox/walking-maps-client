import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import AuthService from '../api/auth-service';

class NavMain extends Component {
  constructor(props){
    super(props);
		this.state = {
			loggedIn : false,
		}
  }

  render(){
    return (
      <nav className="topNav">
				<div className="navHome">
					<NavLink activeClassName="is-active" to="/" >Home</NavLink>
				</div>
				<div className="navRight" >
						<NavLink activeClassName="is-active" to="/create" >+ Create New Map</NavLink>
						{this.state.loggedIn && <NavLink activeClassName="is-active" to="#" >Favorites</NavLink>}
						{this.state.loggedIn && <NavLink activeClassName="is-active" to="#" >Profile</NavLink> }
						{!this.state.loggedIn && <NavLink activeClassName="is-active" to="/login" >Login</NavLink> }
				</div>
			</nav>
    )
  }
}

export default NavMain
