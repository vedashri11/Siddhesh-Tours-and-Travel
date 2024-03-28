import React, { useState, useEffect } from 'react';
import './App.css';
import Converter from './Converter';
import { MetaMaskSDK } from "@metamask/sdk";

const App = () => {
  const [etherAmount, setEtherAmount] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const rupeeAmount = 10000; // Price for Kerala tourist package

  const convertToEther = async (isTesting) => {
    try {
      const etherPrice = await fetchEtherPrice();
      if (etherPrice !== null) {
        const etherAmt = (rupeeAmount / etherPrice).toFixed(8);
        setEtherAmount(etherAmt);
        copyToClipboard(etherAmt);
        // Display confirmation popup
        alert(`Need to pay ${etherAmt} Ether and copied to clipboard. Ready to proceed?`);
        // Redirect to next page after 1 second and reload
        if (isTesting) {
          setTimeout(() => {
            window.location.href = 'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#';
          }, 1000);
        } else {
          window.open('https://portfolio.metamask.io/send', '_blank');
        }
      } else {
        alert('Failed to fetch Ether price.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while converting.');
    }
  };

  useEffect(() => {
    const checkTransactionStatus = async () => {
      try {
        // Check transaction status using provided URL
        const response = await fetch('https://testnet.snowtrace.io/address/0x42DbA2E3E71CA92788A2C9C9EcBf7FBA229D108b');
        const data = await response.json();
        if (data.status === 'success') {
          setSuccessMessage('Transaction successful! Redirecting to main page...');
          // Redirect to main page after 2 seconds
          setTimeout(() => {
            window.location.href = 'main_page_url'; // Replace 'main_page_url' with your main page URL
          }, 2000);
        }
      } catch (error) {
        console.error('Error checking transaction status:', error);
      }
    };

    // Check transaction status every 5 seconds
    const intervalId = setInterval(() => {
      checkTransactionStatus();
    }, 5000);

    // Cleanup function to clear interval
    return () => clearInterval(intervalId);
  }, []);

  const fetchEtherPrice = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
      const data = await response.json();
      return data.ethereum.inr;
    } catch (error) {
      console.error('Failed to fetch Ether price:', error);
      return null;
    }
  };

  const copyToClipboard = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  return (
    <div className="App">
      <Converter convertToEther={convertToEther} />
      {etherAmount && <p className="result">Equivalent Ether Amount: {etherAmount}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default App;
