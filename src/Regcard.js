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
			<Card className="infocard"> 
				<CardTitle title="">
					<Randvatar reddit={name} style={{margin: "auto"}}/>
				</CardTitle> 
				<CardText className="md-text-center"> 
					<div className="infofield"> Switch to your preffered Ethereum address
						<Paper zDepth={0} className="fullgradient"> {addr} </Paper> 
					</div>
					<div className="infofield"> Create a new /r/ethereumproofs post with your current address as the post title
						
					</div>
					<div className="infofield"> Copy paste your r/ethereumproofs URL here
						<Paper zDepth={0} className="TextInput">
							<TextField
								id="proofText"
								label=""
								value={proof}
								onChange={this.HandleTextChange}
								className="centerinputs"
							/>
						</Paper> 
					</div>
				</CardText>
				<CardActions style={{height:"50px"}}>
					<Button raised primary={true}className="ButtonLeft" label="Submit"  
						onClick={() => {RegisterNew(name, addr, proof);}} disabled={false}> check </Button>
					<Button raised primary={true} className="ButtonRight" label="POST" target="_blank" 
							href={"https://www.reddit.com/r/ethereumproofs/submit?selftext=true&title="+addr}>  comment </Button>
				</CardActions>
			</Card>
		);
	}
}