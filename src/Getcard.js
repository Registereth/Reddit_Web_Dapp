/* eslint-disable */
import React from "react";
import Card from "react-md/lib/Cards/Card";
import CardTitle from "react-md/lib/Cards/CardTitle";
import CardActions from "react-md/lib/Cards/CardActions";
import CardText from "react-md/lib/Cards/CardText";
import Media from "react-md/lib/Media";
/* eslint-enable */

const metaimg = "/img/meta.png";
const mistimg = "/img/mist.png";

const Getcard = () => (
  <Card className="md-block-centered infocard">
    <CardTitle title="Needs more Ethereum!"/>
    <CardText>
      <p>In order to use this application you need to have <b>Metamask</b> installed in your Chrome browser, or download the Ethereum <b>Mist browser</b></p>
    </CardText>
    <div className="md-grid ">
      <Media className="md-cell md-cell--6">
        <img src={metaimg} role="presentation" style={{backgroundColor: "blueviolet"}}/>
      </Media>
      <Media className="md-cell md-cell--6">
        <img src={mistimg} role="presentation" />
      </Media>
    </div>
        
  </Card>
);

export default Getcard;