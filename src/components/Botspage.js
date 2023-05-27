import React, { useState, useEffect } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import Filter from "./Filter";
import axios from "axios";
import Swal from "sweetalert2";

//initialize bot url for data fetching
const baseUrl = "http://localhost:8002/bots";

const BotsPage = () => {
  const [bots, setBots] = useState([]);
  const [swarm, setSwarm] = useState([]);
  const [selectedBotClasses, setSelectedBotClasses] = useState([]);
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

  const enlistBot = (bot) => {
    if (!swarm.includes(bot) && !selectedBotClasses.includes(bot.bot_class)) {
      setSwarm((prevBots) => [...prevBots, bot]);
      setSelectedBotClasses(bot.bot_class);
      console.log(selectedBotClasses);
      setDisplayedBots(
        displayedBots.filter((displayedBot) => displayedBot.id !== bot.id)
      );

      Swal.fire({
        title: "Bot Enlisted",
        text: `${bot.name} has been added to your army.`,
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
    try {
      fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      }).then(() => {
        setBots((prevBots) => prevBots.filter((prevBot) => prevBot.id !== id));
        setSwarm((prevSwarm) => prevSwarm.filter((bot) => bot.id !== id));
        setDisplayedBots((prevDisplayedBots) =>
          prevDisplayedBots.filter((bot) => bot.id !== id)
        );
      });
    } catch (error) {
      console.log("An error occurred during the API request:", error);
    }
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
