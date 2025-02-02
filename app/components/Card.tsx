import React from "react";
import { Item } from "@/app/data/items";
import styles from "./Card.module.css";

interface CardProps {
  item?: Item;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ item, onClick }) => {
  if (!item) return null;

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={`${styles.cardRarity} ${styles[item.rarity]}`} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{item.name}</h3>
        <p className={styles.cardType}>{item.type}</p>
        {item.durability !== undefined && (
          <p className={styles.cardDurability}>Durability: {item.durability}</p>
        )}
      </div>
    </div>
  );
};

export default Card;
