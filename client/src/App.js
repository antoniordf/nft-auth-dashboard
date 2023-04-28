import React, { useState, useEffect, Fragment } from "react";
import { initWeb3, initContract, userHasNFT } from "./utils/web3"; // Import the utility functions
import DApp from "./build/contracts/DApp.json"; // Import the compiled contract JSON

// Components
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() {
  const [hasAnyNFT, setHasAnyNFT] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userAddress, setUserAddress] = useState("");
  const dAppContractAddress = "0x015C7643dcFaC4C87a5bf35d6c534133d2b646FB";

  useEffect(() => {
    const setup = async () => {
      await initWeb3();
      await initContract(DApp.abi, dAppContractAddress);

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const address = accounts[0];
      setUserAddress(address);

      const result = await userHasNFT(address);
      setHasAnyNFT(result);
      setLoading(false);
    };

    setup();
  }, [dAppContractAddress]);

  // Render the content conditionally based on the hasAnyNFT state
  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : hasAnyNFT ? (
        // Display the main content of your app
        <div>
          <Fragment>
            <div className="container">
              Welcome, NFT holder! You can now access the content.
              <InputTodo userAddress={userAddress} />
              <ListTodos />
            </div>
          </Fragment>
        </div>
      ) : (
        // Display a message indicating the user doesn't have any NFT from the collection
        <div>
          Sorry, you do not have any NFT from the specified collection. Access
          denied.
        </div>
      )}
    </div>
  );
}

export default App;
