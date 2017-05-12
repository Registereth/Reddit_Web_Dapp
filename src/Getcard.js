/* eslint-disable */
import React, { Component } from "react";
import Card from "react-md/lib/Cards/Card";
import CardTitle from "react-md/lib/Cards/CardTitle";
import CardActions from "react-md/lib/Cards/CardActions";
import CardText from "react-md/lib/Cards/CardText";
import Media from "react-md/lib/Media";
/* eslint-enable */

const metaimg = "/img/meta2.png";
const mistimg = "/img/mist2.png";

class Getcard extends Component {

	openmeta(){
		window.open("https://metamask.io/");
	}

	openmist(){
		window.open("https://github.com/ethereum/mist");
	}
	render() {
		return (
			<Card className="infocard">
				<CardTitle className="centertitle" title="Needs more Ethereum!"/>
				<CardText>
					<p>In order to use this application you need to have <b>Metamask</b> installed in your Chrome browser, or download the Ethereum <b>Mist browser</b>.
					You also need to have an ethereum address; and be on mainnet</p>
				</CardText>
				<div className="md-grid ">
					<Media className="md-cell md-cell--6">
						<img src={metaimg} role="presentation" onClick={()=>{this.openmeta();}}/>
					</Media>

					<Media className="md-cell md-cell--6">
						<img src={mistimg} role="presentation" onClick={()=>{this.openmist();}}/>
					</Media>
				</div>

			</Card>
		);
	}
}

export default Getcard;