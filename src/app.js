import React from "react";// eslint-disable-line
import ReactDOM from "react-dom";

import NavigationDrawer from "react-md/lib/NavigationDrawers";

import Greeting from "./bar.js";// eslint-disable-line

const App = () => (
  <NavigationDrawer
    drawerTitle="react-md with webpack"
    toolbarTitle="Welcome to react-md"
    tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
    desktopDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
  >
    <Greeting />
  </NavigationDrawer>
);

ReactDOM.render(<App />, document.getElementById("root"));