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
import CheckTransaction from "./DappUtils.js";
import LinearProgress from 'react-md/lib/Progress/LinearProgress';
/* eslint-enable */

export default class Regcard extends Component {
	constructor(props){
		super(props);
		let contract = new ContractInterface(this.props.web3);
		// FIXME instead of null try empty string or parse the query string
		let addr = this.props.addr?this.props.addr:this.props.coinbase;
		let name = this.props.name?this.props.name:null;
		let proof = this.props.proof?this.props.proof:null;
		this.state = {
			addr: addr,
			name: name,
			proof: proof,
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
	}

	MakeRedditPost(){
		window.open("https://www.reddit.com/r/ethereumproofs/submit?selftext=true&title="+this.state.addr);
	}

	HandleTextChange(newval){
		this.setState({proof: newval});
	}

	Register(){
		this.contract.GetCost((cost)=>{
			this.setState({cost:cost});
			this.contract.RegisterNew(this.state.addr, this.state.proof, cost, (txhash)=>{
				this.setState({txhash: txhash, status: txhash?"pending":"error"});
				this.Checker(txhash);
			});
		});
	}

	Checker(txhash){
		CheckTransaction(txhash, 1000000, this.state.web3, (txstatus)=>{
			this.setState({txstatus:txstatus});
		} );
		this.setState({txtimer: setInterval(()=>{
			if(this.state.txstatus.status==="error"){clearInterval(this.state.txtimer);this.setState({status:"error"});} // if an error happens we stop
			if(this.state.txstatus.status==="pending"){this.setState({status:"pending"});}// do nothing while pending, just loop
			if(this.state.txstatus.status==="success"){clearInterval(this.state.txtimer);this.setState({status:"success"});} // stop, notify of success
		}, 4000)});
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
					{this.state.status==="pending" && <LinearProgress key="progress"/>}
					{this.state.status==="success" && <Paper zDepth={2}> You've been registered! </Paper>}
					{this.state.status==="error" && <Paper zDepth={3}> An error has occurred. </Paper>}
				</CardText>
				<CardActions style={{height:"50px"}}>
					<Button raised primary={true}className="ButtonLeft" label="Submit"  
						onClick={() => {this.state.contract.RegisterNew(name, addr, proof);}} disabled={false}> check </Button>
					<Button raised primary={true} className="ButtonRight" label="POST" target="_blank" 
							href={"https://www.reddit.com/r/ethereumproofs/submit?selftext=true&title="+addr}>  comment </Button>
				</CardActions>
			</Card>
		);
	}
}