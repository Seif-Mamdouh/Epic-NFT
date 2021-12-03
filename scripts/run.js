// Awesome — we've got a smart contract! But, we don't know if it works. We need to actually:
// Compile it.
// Deploy it to our local blockchain.
// Once it's there, that console.log will run.

const main = async () => {
  //It complies our contract and generate the necessary files we need to work with our contract under the arifacts directory.
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");

  //This pretty fancy. Hardhat creates a local Ethereum network for my contract only. The script runs and then destroys the local network.
  //The benifit of that is that creates a brand new fresh blockchain in order to make it easier to debug.
    const gameContract = await gameContractFactory.deploy(
      ["Batman", "Deadpool", "Elon Musk"], //Names of chacters
      [
        "https://imgur.com/u6ujaGo.png", // Images
        "https://imgur.com/R076K0l.png",
        "https://imgur.com/e5vUdDz.png",
      ],
      [100, 200, 300], // HP values
      [100, 50, 25] //Attack damage values
    );

  //The creates fake "miners" on your machine to try to its best to imitate the actual blockchain. It's fake miners so we can run our contract and imtaite actual blockchain.  
  //Minning is the process of adding transactions to the large distributed public ledger of 
  //existing transactions, known as the blockchain
  await gameContract.deployed();
    console.log("Contract deployed to: ", gameContract.address);
    
    let txn;
    // We only have three characters.
    // an NFT w/ the character at index 2 of our array.
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    // Get the value of the NFT's URI.
    let returnedTokenUri = await gameContract.tokenURI(1);
    console.log("Token URI: ", returnedTokenUri);
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


