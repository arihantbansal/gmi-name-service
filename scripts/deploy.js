const main = async () => {
	const domainContractFactory = await hre.ethers.getContractFactory("Domains");
	const domainContract = await domainContractFactory.deploy("gmi");
	await domainContract.deployed();

	console.log("Contract deployed to:", domainContract.address);

	let txn = await domainContract.register("0xari", {
		value: hre.ethers.utils.parseEther("0.1"),
	});
	await txn.wait();
	console.log("Minted domain 0xari.gmi");

	txn = await domainContract.setRecord("0xari", "well, look who it is");
	await txn.wait();
	console.log("Set record for 0xari.gmi");

	const address = await domainContract.getAddress("0xari");
	console.log("Owner of domain 0xari:", address);

	const balance = await hre.ethers.provider.getBalance(domainContract.address);
	console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

runMain();
