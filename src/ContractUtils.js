class ContractInterface {
	constructor(web3){
		this.stringabi = '[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"registrars","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_registrarType","type":"uint8"}],"name":"getCost","outputs":[{"name":"cost","type":"uint256"}],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"bytes32"},{"name":"_addr","type":"address"},{"name":"_result","type":"string"},{"name":"_message","type":"string"}],"name":"error","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"string"},{"name":"_registrarType","type":"uint8"}],"name":"lookupName","outputs":[{"name":"addr","type":"address"},{"name":"proof","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"registrarTypes","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"bytes32"},{"name":"_name","type":"string"},{"name":"_addr","type":"address"},{"name":"_proof","type":"string"}],"name":"update","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_registrarType","type":"string"},{"name":"_registrar","type":"address"}],"name":"createRegistrar","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"},{"name":"_registrarType","type":"uint8"}],"name":"lookupAddr","outputs":[{"name":"name","type":"string"},{"name":"proof","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_proof","type":"string"},{"name":"_addr","type":"address"},{"name":"_registrarType","type":"uint8"}],"name":"register","outputs":[{"name":"oracleId","type":"bytes32"}],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_registrarType","type":"string"},{"indexed":false,"name":"_registrar","type":"address"}],"name":"RegistrarUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_proof","type":"string"},{"indexed":true,"name":"_addr","type":"address"},{"indexed":false,"name":"_id","type":"bytes32"},{"indexed":false,"name":"_registrarType","type":"uint8"}],"name":"RegistrationSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_name","type":"string"},{"indexed":true,"name":"_addr","type":"address"},{"indexed":false,"name":"_proof","type":"string"},{"indexed":false,"name":"_id","type":"bytes32"},{"indexed":false,"name":"_registrarType","type":"uint8"}],"name":"NameAddressProofRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_addr","type":"address"},{"indexed":false,"name":"_id","type":"bytes32"},{"indexed":false,"name":"_result","type":"string"},{"indexed":false,"name":"_message","type":"string"},{"indexed":false,"name":"_registrarType","type":"uint8"}],"name":"RegistrarError","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_actual","type":"address"},{"indexed":true,"name":"_addr","type":"address"},{"indexed":false,"name":"_registrarType","type":"uint8"}],"name":"AddressMismatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_funds","type":"uint256"},{"indexed":false,"name":"_cost","type":"uint256"},{"indexed":true,"name":"_addr","type":"address"},{"indexed":false,"name":"_registrarType","type":"uint8"}],"name":"InsufficientFunds","type":"event"}]';
		this.abi = JSON.parse(this.stringabi);

		this.address = "0x460f56cf5e6b5a4053c9ee710e798b18a5c05ca1";
		this.contractclass = web3.eth.contract(this.abi);
		this.instance = this.contractclass.at(this.address);
	}

	GetAddrFromName(name, callback) {
		if(!name){callback(null);return null;}
		this.instance.lookupName.call(name, 0, function(err, retval){
			if(err){callback(null);}
			callback(retval?retval[0]:null);
		});
		return;
	}

	GetNameFromAddr(addr, callback) {
		if(!addr){callback(null);return null;}
		this.instance.lookupAddr.call(addr, 0, function(err, retval){
			if(err){callback(null);}
			callback(retval?retval[0]:null);
		});
		return;
	}

	GetProofFromAddr(addr, callback) {
		if(!addr){callback(null);return null;}
		this.instance.lookupAddr.call(addr, 0, function(err, retval){
			if(err){callback(null);}
			callback(retval?retval[1]:null);
		});
		return;
	}

	GetCost(callback){
		if(!callback){callback(null);return null;}
		this.instance.getCost.call(0, function(err, retval){
			if(err){callback(null);}
			callback(retval?retval.toString():null);
		});
		return;
	}

	RegisterNew(addr, proof, cost, callback) {
		if(!addr || !proof){callback(null);return null;}
		this.instance.register.sendTransaction(proof, addr, 0, {from:addr, value:cost}, function(err, retval){
			if(err){callback(null);}
			callback(retval?retval:null);
		});
		return true;
	}

}


export default ContractInterface;