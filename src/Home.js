import React, { Component } from 'react';
import {Card, CardTitle, CardText} from "react-md/lib/Cards";


export default class Home extends Component {
  render() {
    return (
      <Card className="greeting"> 
        <CardTitle title="foo" /> 
          <CardText> 
            <p> bar </p> 
          </CardText>
      </Card>
    );
  }
}