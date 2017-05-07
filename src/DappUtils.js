/* eslint-disable */
import Web3 from "web3"
/* eslint-enable */


function ParseOutNameAddr(querystring) {
	let getname = new RegExp(/\?username=([^&\s]+)/i);
	let getaddr = new RegExp(/\?address=([^&\s]+)/i);
	let name = getname.exec(querystring);
	let addr = getaddr.exec(querystring);
	return ({
		name: name?name[1]:null, // if there's a match, take it. Otherwise return null
		addr: addr?addr[1]:null
	});

}

/*
stateref will be an object that starts out with {web3: someweb3}, and will then be used to store the state between iterations
it will contain {status: "pending"} while transaction is pending, {status: "error"} on error, and {status: "success"} on success
*/
function CheckTransaction(hash, gas, stateref) {
	if(!stateref){ // cant do anything without this
		return;
	}
	if(!stateref.web3){ // Make sure there is web3
		stateref.status = "error";
		stateref.extra = "No web3 passed to function"; // a string, optional
		return;
	}
	if(!stateref.iter){
		stateref.iter=0; // first run, setup state
	}
	if(stateref.iter>=120) { // check if we've run too many times
		stateref.status = "error";
		stateref.extra = "Ran out of iterations"; // a string, optional
		return;
	}
	if(stateref.status==="error"||stateref.status==="success"){ // end condition of recursive calling
		return;
	}

	stateref.web3.eth.getTransactionReceipt(hash,
		function(error, obj) {
			if (error){ // we got an error from web3
				stateref.status = "error";
				stateref.extra = "web3 get receipt returned an error: "+error;
				return; // we can stop here
			}
			if (obj != null){ // we got some response from web3
				if ((obj["blockHash"] == "0x0000000000000000000000000000000000000000000000000000000000000000") || (obj["blockHash"] == null)) {
					// Transaction not minted yet
					stateref.iter++; // increment the counter
					setTimeout(function(){ CheckTransaction(hash, gas, stateref );}, 4000); // prepare the next call
					return; // and stop here
				} else{
					// Transaction minted
					if (obj["gasUsed"] == gas) {
						// Probably ran out of gas.
						stateref.status = "error";
						stateref.extra = "Ran out of gas"; // users get a bit more confident error message :D
						return;
					} else{
						// All good 
						stateref.status = "success";
						stateref.extra = "Transaction mined successfully";
						return;
					}
				}
			}
		}
	);

	return; // The above method will return immediately, and either give the caller a response, or call this function again
}


var persistedweb3 = null; 
function CheckGetweb3() {
	console.log("entered CheckGetweb3");
	if(persistedweb3){ // caching the result for speed and accuracy
		return persistedweb3; 
	}

	// Checking if Web3 has been injected by the browser (Mist/MetaMask)
	if (typeof window.web3 !== "undefined" && typeof Web3 !== "undefined") {
		// Use Mist/MetaMask's provider
		let newweb3 = new Web3(window.web3.currentProvider);
		persistedweb3 = newweb3; // lemme just save this
		return newweb3;
	}

	return null; // if its not injected, return null

}

function GetCoinbase(web3){
	if ((!web3 || (!web3.eth.accounts || (web3.eth.accounts.length == 0)))) {
		return null; // no coinbase, or no web3 passed in
	} else {
		return web3.eth.accounts[0]; // returning the first account
	}
}

export {GetCoinbase, CheckGetweb3, CheckTransaction, ParseOutNameAddr };