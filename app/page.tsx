"use client";

import React, { useState } from "react";
import IntroScreen from "@/app/screens/IntroScreen";
import HeroSelection from "@/app/components/HeroSelection";
import InventoryUI from "@/app/components/Inventory";
import PackOpening from "@/app/components/PackOpening"; // ✅ Import PackOpening
import { Player } from "@/app/data/player";
import { Hero } from "@/app/data/heroes";
import styles from "./page.module.css";

const HomePage: React.FC = () => {
  const [gameState, setGameState] = useState<
    "intro" | "heroSelection" | "packOpening" | "inventory"
  >("intro");
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);

  const startGame = () => {
    setGameState("heroSelection");
  };

  const selectHero = (hero: Hero) => {
    const newPlayer = new Player(hero.name);
    setSelectedHero(hero);
    setPlayer(newPlayer);
    setGameState("packOpening"); // ✅ Transition to pack opening
  };

  // Function to update the player state
  const updatePlayer = (updatedPlayer: Player) => {
    setPlayer(updatedPlayer);
  };

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        {gameState === "intro" && <IntroScreen onStart={startGame} />}
        {gameState === "heroSelection" && (
          <HeroSelection onSelect={selectHero} />
        )}
        {gameState === "packOpening" && player && (
          <PackOpening
            player={player}
            onFinish={() => setGameState("inventory")}
          /> // ✅ Correctly passing `onFinish`
        )}
        {gameState === "inventory" && player && (
          <>
            <h1 className={styles.pageTitle}>Welcome, {player.name}!</h1>
            {/* Pass the updatePlayer function to InventoryUI */}
            <InventoryUI player={player} updatePlayer={updatePlayer} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
