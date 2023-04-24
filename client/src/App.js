import React, { useState, useEffect } from 'react';
import { initWeb3, initContract, userHasNFT } from '../utils/web3'; // Import the utility functions
import DApp from '../contracts/DApp.json'; // Import the compiled contract JSON


function App() {
  const [hasAnyNFT, setHasAnyNFT] = useState(false);
  const [loading, setLoading] = useState(true);
  const dAppContractAddress = /* Your deployed DApp contract address */;

  useEffect(() => {
    const setup = async () => {
      await initWeb3();
      await initContract(DApp.abi, dAppContractAddress);

      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const userAddress = accounts[0];

      const result = await userHasNFT(userAddress);
      setHasAnyNFT(result);
      setLoading(false);
    };

    setup();
  }, []);

  // Render the content conditionally based on the hasAnyNFT state
  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : hasAnyNFT ? (
        // Display the main content of your app
        <div>Welcome, NFT holder! You can now access the content.</div>
      ) : (
        // Display a message indicating the user doesn't have any NFT from the collection
        <div>Sorry, you do not have any NFT from the specified collection. Access denied.</div>
      )}
    </div>
  );
}

export default App;
