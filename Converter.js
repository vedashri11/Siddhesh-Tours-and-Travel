import React from 'react';

const Converter = ({ convertToEther }) => {
  return (
    <div className="container">
      <h1>Ether Price Converter</h1>
      <p>Price for Kerala tourist package: 10,000 Rupees</p>
      <div className="buttons-container">
        <button onClick={() => convertToEther(false)}>Main Site</button>
        <button onClick={() => window.open('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html# ', '_blank')}>Testing Environment</button>
      </div>
      <p>Please copy the calculated Ether amount and paste it into MetaMask for payment.</p>
    </div>
  );
};

export default Converter;
