class ContractInterface {
	constructor(web3){
		this.abi = [{"constant":false,"inputs":[{"name":"_proof","type":"string"},{"name":"_addr","type":"address"}],"name":"register","outputs":[{"name":"oracleId","type":"bytes32"}],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"lookupAddr","outputs":[{"name":"name","type":"string"},{"name":"proof","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"string"}],"name":"lookupName","outputs":[{"name":"addr","type":"address"},{"name":"proof","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_addr","type":"address"},{"name":"_proof","type":"string"}],"name":"update","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"bytes32"},{"name":"_addr","type":"address"},{"name":"_result","type":"string"},{"name":"_message","type":"string"}],"name":"error","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getCost","outputs":[{"name":"cost","type":"uint256"}],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_proof","type":"string"},{"indexed":false,"name":"_addr","type":"address"},{"indexed":false,"name":"_id","type":"bytes32"}],"name":"RegistrationSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_name","type":"string"},{"indexed":false,"name":"_addr","type":"address"},{"indexed":false,"name":"_proof","type":"string"}],"name":"NameAddressProofRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_addr","type":"address"},{"indexed":false,"name":"_id","type":"bytes32"},{"indexed":false,"name":"_result","type":"string"},{"indexed":false,"name":"_message","type":"string"}],"name":"RegistrarError","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_actual","type":"address"},{"indexed":false,"name":"_addr","type":"address"}],"name":"AddressMismatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_funds","type":"uint256"},{"indexed":false,"name":"_cost","type":"uint256"},{"indexed":false,"name":"_addr","type":"address"}],"name":"InsufficientFunds","type":"event"}];

		this.address = "0x293442b5a058A80B2cD5BA6627f7b64695FBD9cb";
		this.contractclass = web3.eth.contract(this.abi);
		this.instance = this.contractclass.at(this.address);
	}

	GetAddrFromName(name, callback) {
		if(!name){return null;}
		this.instance.lookupName.call(name, function(err, retval){
			if(err){callback(null);}
			callback(retval?retval[0]:null);
		});
		return;
	}

	GetNameFromAddr(addr, callback) {
		if(!addr){return null;}
		this.instance.lookupAddr.call(addr, function(err, retval){
			if(err){callback(null);}
			callback(retval?retval[0]:null);
		});
		return;
	}

	GetProofFromAddr(addr, callback) {
		if(!addr){return null;}
		this.instance.lookupAddr.call(addr, function(err, retval){
			if(err){callback(null);}
			callback(retval?retval[1]:null);
		});
		return;
	}

	RegisterNew(name, addr, proof) {
		return true;
	}

}


export default ContractInterface;