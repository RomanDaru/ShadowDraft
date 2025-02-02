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
  const [view, setView] = useState<"character" | "inventory">("character");
  const items = player.getItems();
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
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Inventory</h2>
      <div className={styles.toggleButtons}>
        <button
          className={`${pageStyles.button} ${
            view === "character" ? styles.active : ""
          }`}
          onClick={() => setView("character")}>
          Character
        </button>
        <button
          className={`${pageStyles.button} ${
            view === "inventory" ? styles.active : ""
          }`}
          onClick={() => setView("inventory")}>
          Inventory
        </button>
      </div>

      {view === "character" ? (
        <div className={styles.characterGrid}>
          <div className={styles.head}>
            {equippedItems.helmet?.name || "Helmet"}
          </div>
          <div className={styles.chest}>
            {equippedItems.chestArmor?.name || "Chest"}
          </div>
          <div className={styles.gloveLeft}>
            {equippedItems.gloves?.name || "Left Glove"}
          </div>
          <div className={styles.gloveRight}>
            {equippedItems.gloves?.name || "Right Glove"}
          </div>
          <div className={styles.boots}>
            {equippedItems.boots?.name || "Boots"}
          </div>
          <div className={styles.weapon}>
            {equippedItems.weapon?.name || "Weapon"}
          </div>
          <div className={styles.passives}>
            <strong>Passives:</strong>
            {equippedItems.passives.length > 0 ? (
              equippedItems.passives.map((passive, index) => (
                <button
                  key={`${passive.id}-${index}`}
                  className={styles.equippedItem}
                  onClick={() => handleItemClick(passive)}>
                  {passive.name} ({passive.rarity})
                </button>
              ))
            ) : (
              <span className={styles.emptySlot}>None</span>
            )}
          </div>
        </div>
      ) : (
        <ul className={styles.list}>
          {items.length === 0 ? (
            <p>No items in inventory.</p>
          ) : (
            items.map((item) => (
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
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default InventoryUI;
