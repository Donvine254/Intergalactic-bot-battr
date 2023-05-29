import React from "react";

const Header = () => {
  return (
    <div id="header">
      <h1>Welcome to Bot Battlr!</h1>
      <span className="bot-logo">🤖</span>
      <div>
        <button className="btn">Login In</button>
        <button className="btn">Sign Up</button>
      </div>
    </div>
  );
};

export default Header;
