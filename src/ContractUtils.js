function GetAddrFromName(name) {
	return "0xdeadbeef";
}
function GetNameFromAddr(addr) {
	return "FakeName";
}
function GetProofFromAddr(addr) {
	return "www.reddit.com/r/ethereumproofs/comments/foobar/fakeproof";
}
function RegisterNew(name, addr, proof) {
	return true;
}

export {GetNameFromAddr, GetAddrFromName, GetProofFromAddr, RegisterNew};