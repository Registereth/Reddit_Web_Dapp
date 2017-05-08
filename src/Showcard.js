/* eslint-disable */
import React, { Component } from 'react';
import { Link as RouterLink, Route } from "react-router-dom";
import Randvatar from "./Randvatar.js";
import Card from "react-md/lib/Cards/Card";
import CardTitle from "react-md/lib/Cards/CardTitle";
import CardActions from "react-md/lib/Cards/CardActions";
import CardText from "react-md/lib/Cards/CardText";
import Paper from 'react-md/lib/Papers';
import Button from 'react-md/lib/Buttons/Button';
import ContractInterface from "./ContractUtils.js";
import {ParseOutNameAddr} from "./DappUtils.js";
/* eslint-enable */



export default class Showcard extends Component {
	constructor(props){
		super(props); // call parent cons
		var querystring = this.props.location.search.substr(1); // this removes the leading "?"
		var NameAddrObj = ParseOutNameAddr(querystring);
		var name = NameAddrObj.name; // This ugle bit of code brought to us by babel hainvg issues with object destructuring
		var addr = NameAddrObj.addr;
		var contract = new ContractInterface(this.props.web3);
		if(name){ // got a name in the url
			this.state = {name: name, contract:contract, addr:"pending...", proof:"pending...", todo:"ExtraFromName"};
			// this.ExtraFromName(name);
		} else if(addr){ // got an addr in the format
			this.state = {addr:addr, contract:contract, name:"pending...", proof:"pending...", todo:"ExtraFromAddr"};
			// this.ExtraFromAddr(addr);
		} else if(this.props.coinbase){ // no addr or name, but user has an address
			this.state = {addr:this.props.coinbase, contract:contract, name:"pending...", proof:"pending...", todo:"ExtraFromAddr"};
			// this.ExtraFromAddr(addr);
		} else{ // This really should never happen. This card should not be rendered without having the input needed in some way
			this.state = {
				addr:"0xDEADBEEF",
				name:"Error occured",
				proof:"www.A mistake happened, please report it to the devs.com",
				contract:contract,
				todo: "Error"
			};
		}
		this.ExtraFromName = this.ExtraFromName.bind(this);
		this.ExtraFromAddr = this.ExtraFromAddr.bind(this);
		return;
	}

	componentWillMount(){ // These calls delayed so that no setstate can be called before the thing is actually about to be rendered
		if(this.state.todo==="ExtraFromName"){this.ExtraFromName(this.state.name);}
		if(this.state.todo==="ExtraFromAddr"){this.ExtraFromAddr(this.state.addr);}
		// if(this.state.todo==="Error"){} // Currently not handled in any special way other than displaying error values on the card
	}
	ExtraFromName(name){
		this.state.contract.GetAddrFromName(name,(address)=>{
			this.setState({addr: address});
			this.state.contract.GetProofFromAddr(address,(theproof)=>{
				this.setState({proof: theproof});
			});
		});
	}
	ExtraFromAddr(addr){
		this.state.contract.GetNameFromAddr(addr,(name)=>{
			this.setState({name: name});
			this.state.contract.GetProofFromAddr(addr,(proof)=>{
				this.setState({proof:proof});
			});
		});
	}
	render() {
		return (
			<Card className="infocard"> 
				<CardTitle title="">
					<Randvatar reddit={this.state.name||"ErrorExample"} style={{margin: "auto"}}/>
				</CardTitle> 
				<CardText style={{textAlign: "center"}}> 
					<div className="infofield"> You are <Paper zDepth={2} className="fullgradient"> {this.state.addr||"0xDEADBEEF"} </Paper> </div>
					<div className="infofield"> Your Reddit username is<Paper zDepth={2} className="fullgradient"> {this.state.name||"Error occured"} </Paper> </div>
					<div className="infofield"> Your Proof of Reddit is posted at <Paper zDepth={2} className="fullgradient"> {this.state.proof||"Error"} </Paper> </div>
				</CardText>
				<CardActions>
					<RouterLink to="page-3" className="md-block-centered"> 
						<Button raised primary={true} label="Change" style={{fontSize: "13px", textTransform: "none"}} > edit </Button>
					</RouterLink>
				</CardActions>
			</Card>
		);
	}
}