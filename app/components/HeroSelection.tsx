// components/HeroSelection.tsx - Hero selection screen
import React, { useState } from "react";
import { heroes } from "../data/heroes";
import HeroCard from "./HeroCard";
import styles from "./HeroSelection.module.css";

interface Hero {
  id: number;
  name: string;
  attack: number;
  defense: number;
  special: string;
}

interface HeroSelectionProps {
  onSelect: (hero: Hero) => void;
}

const getRandomHeroes = () => {
  let shuffled = [...heroes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

const HeroSelection: React.FC<HeroSelectionProps> = ({ onSelect }) => {
  const [availableHeroes, setAvailableHeroes] = useState<Hero[]>(
    getRandomHeroes()
  );

  return (
    <div className={styles.container}>
      <h2>Select Your Hero</h2>
      <div className={styles.heroGrid}>
        {availableHeroes.map((hero) => (
          <HeroCard key={hero.id} hero={hero} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
};

export default HeroSelection;
