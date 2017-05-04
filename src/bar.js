import React from "react";// eslint-disable-line
import Card from "react-md/lib/Cards/Card";// eslint-disable-line
import CardTitle from "react-md/lib/Cards/CardTitle";// eslint-disable-line
import CardText from "react-md/lib/Cards/CardText";// eslint-disable-line

import "../sass/main.scss";

const Greeting = () => (
  <Card className="greeting">
    <CardTitle title="Hello from react-md" />
    <CardText>
      <p>
        This is a simple app that is using the <code>NavigationDrawer</code> component
        for the layout and <code>Card</code>, <code>CardTitle</code>,
        and <code>CardText</code> for this message.
      </p>
    </CardText>
    <CardText>
      <p>
        You can edit <code>src/components/App.jsx</code> to start making an app.
        Edit <code>src/_globals.scss</code> for any Sass variable changes.
      </p>
    </CardText>
  </Card>
);

export default Greeting;