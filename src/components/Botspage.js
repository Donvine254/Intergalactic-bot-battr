import React, { useState, useEffect } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import Filter from "./Filter";
import axios from "axios";
import Swal from "sweetalert2";

//initialize bot url for data fetching
const baseUrl = "http://localhost:8002/bots";

//if cloning this repo use "https://api.npoint.io/f2dab3b71d583e4dbdef/bots" if the npm server is not initialized

const BotsPage = () => {
  const [bots, setBots] = useState([]);
  const [swarm, setSwarm] = useState([]);
  const [displayedBots, setDisplayedBots] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await axios.get(baseUrl);
        const data = response.data;
        setBots(data);
        setDisplayedBots(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchBots();
  }, []);
 //prevent enlisting a bot twice or adding bots of the same class

  const enlistBot = (bot) => {
    const botClass = bot.bot_class;
    const existingBotClass = swarm.find((botInSwarm) => botInSwarm.bot_class === botClass)
    if (!swarm.includes(bot) && !existingBotClass) {
      setSwarm((prevBots) => [...prevBots, bot]);
      setDisplayedBots(
        displayedBots.filter((displayedBot) => displayedBot.id !== bot.id)
      );

      Swal.fire({
        title: "Bot Enlisted",
        text: `A ${botClass} bot named ${bot.name} has been added to your army.`,
        icon: "success",
        button: "OK",
        timer: 3000,
      });
    } else {
      Swal.fire({
        title: "Opps!",
        text: "You cannot add two bots of the same class, choose wisely!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00706e",
        cancelButtonColor: "#ff5154",
        backdrop: `rgba(112, 71, 109, 0.9)
        url("https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/03/27/15/robot-army.jpg")
        center no-repeat`,
        confirmButtonText: "I Understand!",
        timer: 3000,
      });
    }
  };

  const removeBot = (bot) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This bot will serve you well!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00706e",
      cancelButtonColor: "#ff5154",
      confirmButtonText: "Yes, I do not want it!",
      timer: 3000,
    }).then((result) => {
      if (result.isConfirmed) {
        setSwarm((prevBots) =>
          prevBots.filter((yourBot) => yourBot.id !== bot.id)
        );
        setDisplayedBots((prevDisplayedBots) => [...prevDisplayedBots, bot]);
      }
    });
  };
 //function to discharge bots and delete them from backend
  function dischargeBot(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently remove the bot",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff5154",
      cancelButtonColor: "#00706e",
      cancelButtonText: "No, I made a mistake",
      confirmButtonText: "Bye Bye Bot!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
          }).then(() => {
            setBots((prevBots) =>
              prevBots.filter((prevBot) => prevBot.id !== id)
            );
            setSwarm((prevSwarm) => prevSwarm.filter((bot) => bot.id !== id));
            setDisplayedBots((prevDisplayedBots) =>
              prevDisplayedBots.filter((bot) => bot.id !== id)
            );
          });
        } catch (error) {
          console.log("An error occurred during the API request:", error);
        }
      }
    });
  }
  //handle bot filtering by class
  function handleClassFilterChange(event) {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);

    const filteredBots = bots.filter((bot) => {
      if (newCategory === "All") {
        return true;
      }
      return bot.bot_class === newCategory;
    });

    setDisplayedBots(filteredBots);
  }

  return (
    <div>
      <YourBotArmy
        bots={swarm}
        removeBot={removeBot}
        dischargeBot={dischargeBot}
      />
      <Filter
        selectedCategory={selectedCategory}
        onFilterChange={handleClassFilterChange}
      />
      <BotCollection
        bots={displayedBots}
        onEnlist={enlistBot}
        dischargeBot={dischargeBot}
      />
    </div>
  );
};

export default BotsPage;
