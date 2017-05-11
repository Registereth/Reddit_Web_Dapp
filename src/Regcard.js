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
import ContractInterface from "./ContractUtils.js";
import {CheckTransaction} from "./DappUtils.js";
import LinearProgress from 'react-md/lib/Progress/LinearProgress';
/* eslint-enable */

export default class Regcard extends Component {
	constructor(props){
		super(props);
		let contract = new ContractInterface(this.props.web3);
		let addr = this.props.addr?this.props.addr:this.props.coinbase;
		let name = this.props.name?this.props.name:"Your reddit name";
		let proof = this.props.proof?this.props.proof:"Paste the reddit link here!";
		this.state = {
			addr: addr,
			name: name,
			proof: proof,
			proofText: "",
			contract: contract,
			web3: this.props.web3,
			cost: 0,
			status: "ready",
			txhash: null,
			txstatus: {},
			txtimer:null
		};
		this.MakeRedditPost = this.MakeRedditPost.bind(this);
		this.HandleTextChange = this.HandleTextChange.bind(this);
		this.Register = this.Register.bind(this);
		this.Checker = this.Checker.bind(this);
		this.IntervalPipe = this.IntervalPipe.bind(this);
	}

	MakeRedditPost(){
		window.open("https://www.reddit.com/r/ethereumproofs/submit?selftext=true&title="+this.state.addr);
	}

	HandleTextChange(newval){
		this.setState({proofText: newval, proof: this.GetRedditHash(newval)});
	}

	GetRedditHash(url){
		let hashex = /.*\/ethereumproofs\/comments\/([a-z0-9]+)\/0x.*/i;
		let reddithash = hashex.exec(url)?hashex.exec(url)[1]:null;
		return reddithash?reddithash:null;
	}

	Register(){
		var caller = this;
		this.state.contract.GetCost((cost)=>{
			caller.setState({cost:cost});
			caller.state.contract.RegisterNew(caller.state.addr, caller.state.proof, cost, (txhash)=>{
				caller.setState({txhash: txhash, status: txhash?"pending":"error"});
				caller.Checker(txhash);
			});
		});
	}

	Checker(txhash){
		var caller = this;
		CheckTransaction(txhash, 1000000, this.state.web3, (txstatus)=>{
			caller.setState({txstatus:txstatus});
		} );
		caller.setState({txtimer: setInterval(caller.IntervalPipe, 4000)});
	}

	IntervalPipe(){
		var caller = this;
		if(caller.state.txstatus.status==="error"){clearInterval(caller.state.txtimer);caller.setState({status:"error"});} // if an error happens we stop
		if(caller.state.txstatus.status==="pending"){caller.setState({status:"pending"});}// do nothing while pending, just loop
		if(caller.state.txstatus.status==="success"){clearInterval(caller.state.txtimer);caller.setState({status:"success"});} // stop, notify of success
	}

	render() {
		const {addr, name, _, proofText} = this.state;
		return (
			<Card className="infocard">
				{this.state.status==="pending" && <LinearProgress key="progress" id="transpending"/>}
				<CardTitle title="">
					<Randvatar reddit={addr||"Initrandom"} style={{margin: "auto"}}/>
				</CardTitle> 
				<CardText className="md-text-center"> 
					{this.state.status==="success" && <Paper zDepth={0} style={{fontSize: "22px"}}>
						<RouterLink to="register" className="md-block-centered"> You've been registered! </RouterLink> </Paper>}
					{this.state.status==="error" && <Paper zDepth={0}> An error has occurred. </Paper>}
					<div className="infofield"> Switch to your preffered Ethereum address
						<Paper zDepth={0} className="solidpaper infopaper"> {addr} </Paper> 
					</div>
					<div className="infofield"> Create a new /r/ethereumproofs post with your current address as the post title
						<Button raised primary={true} className="" label="POST" target="_blank" 
							href={"https://www.reddit.com/r/ethereumproofs/submit?selftext=true&title="+addr}>  comment </Button>
					</div>
					<div className="infofield"> Copy paste your r/ethereumproofs URL here
						<Paper zDepth={0} className="TextInput">
							<TextField
								id="proofText"
								label=""
								value={proofText}
								onChange={this.HandleTextChange}
								className="centerinputs infopaper"
							/>
						</Paper> 
					</div>

					
				</CardText>
				<CardActions style={{height:"50px"}} centered={true}>
					<Button raised primary={true} label="Submit"  
						onClick={() => {this.Register();}} disabled={false}> check </Button>
					
				</CardActions>
			</Card>
		);
	}
}