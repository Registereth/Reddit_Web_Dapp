/* eslint-disable */
import React, { Component } from 'react';
import Randvatar from "./Randvatar.js";
import Card from "react-md/lib/Cards/Card";
import CardTitle from "react-md/lib/Cards/CardTitle";
import CardActions from "react-md/lib/Cards/CardActions";
import CardText from "react-md/lib/Cards/CardText";
import {GetNameFromAddr, GetAddrFromName, GetProofFromAddr} from "./ContractUtils.js";
/* eslint-enable */



export default class Showcard extends Component {
	constructor(props){
		super(props);
		let addr = props.addr?props.addr:GetAddrFromName(props.name);
		let name = props.name?props.name:GetNameFromAddr(props.addr);
		let proof = props.proof?props.proof:GetProofFromAddr(addr);
		this.state = {
			addr: addr,
			name: name,
			proof: proof
		};
	}
	render() {
		return (
      <Card className="greeting"> 
		<CardTitle>
			<Randvatar reddit={this.state.name} />
		</CardTitle> 
		<CardText> 
			<p> bar </p> 
		</CardText>
      </Card>
		);
	}
}