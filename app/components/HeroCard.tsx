"use client";

import React from "react";
import { Hero } from "@/app/data/heroes";
import styles from "./HeroCard.module.css";
import pageStyles from "@/app/page.module.css"; // ✅ Use button styles

interface HeroCardProps {
  hero: Hero;
  onSelect: (hero: Hero) => void;
}

const HeroCard: React.FC<HeroCardProps> = ({ hero, onSelect }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{hero.name}</h3>
      <p>
        ATK: {hero.attack} | DEF: {hero.defense}
      </p>
      <p className={styles.special}>Special: {hero.special}</p>
      <button
        className={`${pageStyles.button} ${pageStyles.primary}`}
        onClick={() => onSelect(hero)}>
        Select
      </button>
    </div>
  );
};

export default HeroCard;
