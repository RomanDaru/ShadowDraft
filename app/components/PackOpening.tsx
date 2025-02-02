"use client";

import React, { useState, useEffect } from "react";
import { openPack } from "@/app/data/pack";
import { Player } from "@/app/data/player";
import { Item } from "@/app/data/items";
import styles from "./PackOpening.module.css";
import pageStyles from "@/app/page.module.css";

interface PackOpeningProps {
  player: Player;
  onFinish: () => void;
}

const PackOpening: React.FC<PackOpeningProps> = ({ player, onFinish }) => {
  const [packItems, setPackItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const maxSelections = 3; // ✅ Player can only pick 3 cards

  useEffect(() => {
    setPackItems(openPack(player)); // ✅ Auto-open the pack
  }, [player]);

  const toggleSelectItem = (item: Item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id)); // ✅ Remove from selection
    } else if (selectedItems.length < maxSelections) {
      setSelectedItems([...selectedItems, item]); // ✅ Add if within limit
    }
  };

  const confirmSelection = () => {
    selectedItems.forEach((item) => player.addItem(item)); // ✅ Restore inventory.addItem()
    onFinish(); // ✅ Transition to inventory screen
  };

  return (
    <div className={styles.container}>
      <h2>Pack Opened! Choose {maxSelections} items</h2>
      <div className={styles.packDisplay}>
        {packItems.map((item) => (
          <div
            key={item.id}
            className={`${styles.itemCard} ${
              selectedItems.includes(item) ? styles.selected : ""
            }`}
            onClick={() => toggleSelectItem(item)}>
            <h3>{item.name}</h3>
            <p>
              <strong>Type:</strong> {item.type}
            </p>
            {item.attack && (
              <p>
                <strong>Attack:</strong> {item.attack}
              </p>
            )}
            {item.defense && (
              <p>
                <strong>Defense:</strong> {item.defense}
              </p>
            )}
            {item.specialEffect && (
              <p>
                <strong>Effect:</strong> {item.specialEffect}
              </p>
            )}
            {item.durability !== undefined && (
              <p>
                <strong>Durability:</strong> {item.durability}
              </p>
            )}
            <p className={styles[item.rarity]}>{item.rarity.toUpperCase()}</p>
          </div>
        ))}
      </div>
      {selectedItems.length === maxSelections && (
        <button
          className={`${pageStyles.button} ${pageStyles.primary}`}
          onClick={confirmSelection}>
          Confirm Selection
        </button>
      )}
    </div>
  );
};

export default PackOpening;
