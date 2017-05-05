/* eslint-disable */
import React, {Component} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router,Route, Switch} from "react-router-dom";
import {Card,CardTitle,CardText} from "react-md/lib/Cards";
import NavigationDrawer from "react-md/lib/NavigationDrawers";
import Randvatar from "./Randvatar.js";
import NavLink from "./Navlink";
import Greeting from "./bar.js";
import "../sass/main.scss";
import Home from "./Home.js";
import Getcard from "./Getcard.js";
import Showcard from "./Showcard.js";
import Regcard from "./Regcard.js";
import ThanksFooter from "./ThanksFooter.js";
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

class Page1 extends Component{
	render() {
		return(
				<Card className="greeting"> <CardTitle title="Not-foo" /> <CardText> <p> Not-bar </p> </CardText></Card>
		);
	}
}

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
					<Switch>
						<Route exact path="/" location={location} component={Home} />
						<Route path="/page-2" location={location} component={Getcard} />
						<Route path="/page-1" location={location} component={Showcard} />
						<Route path="/page-3" location={location} component={Regcard} />
						<Route path="/" location={location} component={Woops} />
					</Switch>

				</NavigationDrawer>
			)}
			/>
		);
	}
}
class Woops extends Component {
	render() {
		return ( 
			<div className="md-block-centered"> <p> Woops, nothing here! </p>  </div>
		);
	}
}
ReactDOM.render( 
	<Router><App /></Router>, document.getElementById("root"));