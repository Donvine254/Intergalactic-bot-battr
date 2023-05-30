import React, { useState } from "react";
import BotCard from "./BotCard";
import BotSpecs from "./BotSpecs";
// import React, { useState, lazy, Suspense } from "react";
// const BotCard=  React.lazy(() => import ("./BotCard")); This is how to implement lazy

function BotCollection({ bots, onEnlist, dischargeBot }) {
  const [selectedBot, setSelectedBot] = useState(null);
  const handleBotClick = (bot) => {
    setSelectedBot(bot);
  };

  if (selectedBot) {
    return (
      <BotSpecs
        bot={selectedBot}
        enlistBot={onEnlist}
        navigateBack={handleGoBack}
      />
    );
  }

  function handleGoBack() {
    setSelectedBot(null);
  }

  const botCards = bots.map((bot) => (
    <BotCard className="bot-card"
      key={bot.id}
      bot={bot}
      botFunction={handleBotClick}
      dischargeBot={dischargeBot}
    />
  ));

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Collection of all bots</h1>
      <div className="ui four column grid">
        <div className="row">{botCards}</div>
      </div>
    </>
  );
}

export default BotCollection;
