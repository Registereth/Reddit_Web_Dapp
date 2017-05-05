/* eslint-disable */
import React, { Component } from 'react';
import Randvatar from "./Randvatar.js";
import Card from "react-md/lib/Cards/Card";
import CardTitle from "react-md/lib/Cards/CardTitle";
import CardActions from "react-md/lib/Cards/CardActions";
import CardText from "react-md/lib/Cards/CardText";
import Paper from 'react-md/lib/Papers';
import Button from 'react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields';
import {GetNameFromAddr, GetAddrFromName, GetProofFromAddr, RegisterNew} from "./ContractUtils.js";
/* eslint-enable */

export default class Regcard extends Component {
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
		this.MakeRedditPost = this.MakeRedditPost.bind(this);
		this.HandleTextChange = this.HandleTextChange.bind(this);
	}

	MakeRedditPost(){
		window.open("https://www.reddit.com/r/ethereumproofs/submit?selftext=true&title="+this.state.addr);
	}

	HandleTextChange(newval){
		this.setState({proof: newval});
	}

	render() {
		const {addr, name, proof} = this.state;
		return (
			<Card className="md-block-centered infocard"> 
				<CardTitle title="">
					<Randvatar reddit={name} style={{margin: "auto"}}/>
				</CardTitle> 
				<CardText className="md-text-center"> 
					<div className="infofield"> Switch to your preffered Ethereum address
						<Paper zDepth={2} className="fullgradient"> {addr} </Paper> 
					</div>
					<div className="infofield"> Create a new /r/ethereumproofs post with your current address as the post title
						<Button raised className="fullgradient" label="POST" target="_blank" style={{fontSize: "10px"}} 
							href={"https://www.reddit.com/r/ethereumproofs/submit?selftext=true&title="+addr}>  comment </Button>
					</div>
					<div className="infofield"> Copy paste your r/ethereumproofs URL here
						<Paper zDepth={2} className="fullgradient">
							<TextField
								id="proofText"
								label=""
								value={proof}
								onChange={this.HandleTextChange}
							/>
						</Paper> 
					</div>
				</CardText>
				<CardActions>
					<Button raised className="fullgradient md-block-centered" label="Submit" style={{fontSize: "10px"}} 
						onClick={() => {RegisterNew(name, addr, proof);}}> check </Button>
				</CardActions>
			</Card>
		);
	}
}