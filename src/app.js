/* eslint-disable */
import React, {Component} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router,Route, Switch} from "react-router-dom";
import {Card,CardTitle,CardText} from "react-md/lib/Cards";
import NavigationDrawer from "react-md/lib/NavigationDrawers";
import NavLink from "./Navlink";
import Greeting from "./bar.js";
import "../sass/example.scss";
import Home from "./Home.js";
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
				drawerTitle="react-md with CRA"
				toolbarTitle="Welcome to react-md"
				navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
				>
				<Switch key={location.key}>
					<Route exact path="/" location={location} component={Home} />
					<Route path="/page-2" location={location} component={Woops} />
					<Route path="/page-1" location={location} component={Page1} />
					<Route path="/page-3" location={location} component={Greeting} />
					
				</Switch>
				</NavigationDrawer>
			)}
			/>
		);
	}
}
class Woops extends Component {
	render() {
		return ( < div >
			< p > Woops, nothing here! < /p>  < /div>
		);
	}
}
ReactDOM.render( 
	<Router><App /></Router>, document.getElementById("root"));