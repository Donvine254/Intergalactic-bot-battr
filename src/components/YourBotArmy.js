import React from "react";
import BotCard from "./BotCard";

function YourBotArmy({bots, removeBot, dischargeBot}) {
  // Map over the bots in the army and create a BotCard for each one
  const armyBots = bots.map((bot) => {
    return <BotCard key={bot.id} bot={bot} botFunction={removeBot} dischargeBot={dischargeBot} />;
  });

  return (
      <div className="ui segment inverted olive bot-army">
      <h1 style={{textAlign:"center"}}>Army bots</h1>
      {armyBots.length === 0 ? <h1>You have no bots in your army</h1> : <h1> Your Army has increased to {armyBots.length} bots</h1>}
        <div className="ui five column grid">
          <div className="row bot-army-row">
          {armyBots}
          </div>
        </div>
      </div>
  );
}

export default YourBotArmy;
