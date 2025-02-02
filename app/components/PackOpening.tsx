"use client";

import React, { useState } from "react";
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
  const [isOpened, setIsOpened] = useState(false); // ✅ Track if pack is opened
  const maxSelections = 3;

  const handleOpenPack = () => {
    setPackItems(openPack(player)); // ✅ Open pack on button click
    setIsOpened(true);
  };

  const toggleSelectItem = (item: Item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else if (selectedItems.length < maxSelections) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const confirmSelection = () => {
    selectedItems.forEach((item) => player.addItem(item));
    onFinish();
  };

  return (
    <div className={styles.container}>
      <h2>Pack Opening</h2>

      {!isOpened ? (
        <button
          className={`${pageStyles.button} ${pageStyles.primary}`}
          onClick={handleOpenPack}>
          Open Pack
        </button>
      ) : (
        <>
          <h3>Choose {maxSelections} items</h3>
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
                <p className={styles[item.rarity]}>
                  {item.rarity.toUpperCase()}
                </p>
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
        </>
      )}
    </div>
  );
};

export default PackOpening;
