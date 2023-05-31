import React from "react";

const Header = () => {
  return (
    <div id="header">
      <h1>Welcome to Bot Battlr!</h1>
      <span className="bot-logo">🤖</span>
      <div>
        <button className="ui button positive">
          <i className="ui lock icon large"></i>

          Login In</button>
        {/* <button className="ui button teal">
          <i className="id card icon large">
          </i>Sign Up</button> */}
      </div>
    </div>
  );
};

export default Header;
