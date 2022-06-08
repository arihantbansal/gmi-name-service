const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners();
	const domainContractFactory = await hre.ethers.getContractFactory("Domains");
	const domainContract = await domainContractFactory.deploy();
	await domainContract.deployed();

	console.log("Contract deployed to:", domainContract.address);
	console.log("Contract deployed by:", owner.address);

	const txn = await domainContract.register("doom");
	await txn.wait();

	const domainOwner = await domainContract.getAddress("doom");
	console.log("Owner of domain %s: %s", "doom", domainOwner);

	txn = await domainContract
		.connect(randomPerson)
		.setRecord("doom", "Haha this is my domain now :D");
	await txn.wait(); // should give an error
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
