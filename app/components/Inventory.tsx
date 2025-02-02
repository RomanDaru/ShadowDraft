"use client";

import React, { useState } from "react";
import { Player } from "@/app/data/player";
import { Item } from "@/app/data/items";
import styles from "./Inventory.module.css";
import pageStyles from "@/app/page.module.css";

interface InventoryProps {
  player: Player;
}

const InventoryUI: React.FC<InventoryProps> = ({ player }) => {
  const [refresh, setRefresh] = useState(false);
  const items = player.getItems(); // ✅ Restore inventory rendering
  const equippedItems = player.getEquipment();

  const handleItemClick = (item: Item | null) => {
    if (!item) return;

    if (
      equippedItems.weapon?.id === item.id ||
      equippedItems.helmet?.id === item.id ||
      equippedItems.chestArmor?.id === item.id ||
      equippedItems.gloves?.id === item.id ||
      equippedItems.boots?.id === item.id ||
      equippedItems.passives.some((p) => p.id === item.id)
    ) {
      player.unequipItem(item);
    } else {
      player.equipItem(item);
    }

    setRefresh(!refresh);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Inventory</h2>
      <ul className={styles.list}>
        {items.length === 0 ? (
          <p>No items in inventory.</p>
        ) : (
          items.map(
            (
              item // ✅ Fix inventory rendering
            ) => (
              <li key={item.id} className={styles.item}>
                <strong>{item.name}</strong> ({item.type}) -{" "}
                <span>{item.rarity}</span>
                {item.durability !== undefined && (
                  <p>Durability: {item.durability}</p>
                )}
                <button
                  className={`${pageStyles.button} ${pageStyles.primary}`}
                  onClick={() => handleItemClick(item)}>
                  Equip
                </button>
              </li>
            )
          )
        )}
      </ul>
    </div>
  );
};

export default InventoryUI;
