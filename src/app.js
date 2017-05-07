/* eslint-disable */
import React, {Component} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router,Route, Switch} from "react-router-dom";
import {Card,CardTitle,CardText} from "react-md/lib/Cards";
import NavigationDrawer from "react-md/lib/NavigationDrawers";
import Randvatar from "./Randvatar.js";
import Greeting from "./bar.js"; // FIXME remove this before release
import "../sass/main.scss"; // The styling
import Web3 from "web3"; // web3
import NavLink from "./Navlink"; // Utility class
import Getcard from "./Getcard.js"; // here down are our own imports
import Showcard from "./Showcard.js";
import Regcard from "./Regcard.js";
import ThanksFooter from "./ThanksFooter.js";
import {GetCoinbase, CheckGetweb3, CheckTransaction, ParseOutNameAddr } from "./DappUtils.js";
/* esling-enable */

const navItems = [{
	exact: true,
	label: "Home",
	to: "/",
	icon: "home",
}, {
	label: "Page 1",
	to: "/page-1",
	icon: "bookmark",
}, {
	label: "Page 2",
	to: "/page-2",
	icon: "donut_large",
}, {
	label: "Page 3",
	to: "/page-3",
	icon: "flight_land",
}];


class App extends Component {
	render() {
		return (
			<Route
			render={({ location }) => (
				<NavigationDrawer
					drawerTitle="Nav"
					toolbarTitle="Register.eth"
					navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
					drawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
					footer={ThanksFooter()}
				>

					<Web3wrapper passon={location}/>

				</NavigationDrawer>
			)}
			/>
		);
	}
}


class Web3wrapper extends Component {
	render(){
		let web3 = CheckGetweb3();
		let passonlocation = this.props.passon;
		if(!web3){ // no web3 so we show them the getcard
			return (
				<Getcard />
			)
		} else{
			return (<div> <p> FOOBAR </p> </div> )
		}
	};
}

class Woops extends Component {
	render() {
		return ( 
			<div className="md-block-centered"> <p> Woops, nothing here! </p>  </div>
		);
	}
}
ReactDOM.render(<Router><App /></Router>, document.getElementById("root"));