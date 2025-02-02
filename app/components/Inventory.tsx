"use client";

import React from "react";
import { Player, EquippedItems } from "@/app/data/player";
import { Item } from "@/app/data/items";
import styles from "./Inventory.module.css";
import pageStyles from "@/app/page.module.css";

interface InventoryProps {
  player: Player;
  updatePlayer: (player: Player) => void;
}

const InventoryUI: React.FC<InventoryProps> = ({ player, updatePlayer }) => {
  const items = player.inventory;
  const equippedItems = player.getEquipment();

  const handleItemClick = (item: Item | null) => {
    if (!item) return;

    // Clone the player to avoid mutation
    const updatedPlayer = player.clone();

    // Use the cloned player for logic
    if (
      updatedPlayer.equipment.weapon?.id === item.id ||
      updatedPlayer.equipment.helmet?.id === item.id ||
      updatedPlayer.equipment.chestArmor?.id === item.id ||
      updatedPlayer.equipment.gloves?.id === item.id ||
      updatedPlayer.equipment.boots?.id === item.id ||
      updatedPlayer.equipment.passives.some((p) => p.id === item.id)
    ) {
      updatedPlayer.unequipItem(item);
    } else {
      updatedPlayer.equipItem(item);
    }

    // Update state with the new player instance
    updatePlayer(updatedPlayer);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Equipped Items</h2>

      <div className={styles.characterGrid}>
        <div className={styles.helmet}>
          <strong>Helmet:</strong>
          {equippedItems.helmet ? (
            <button
              className={styles.equippedItem}
              onClick={() => handleItemClick(equippedItems.helmet)}>
              {equippedItems.helmet.name}
            </button>
          ) : (
            <span className={styles.emptySlot}>Empty</span>
          )}
        </div>

        <div className={styles.chest}>
          <strong>Chest Armor:</strong>
          {equippedItems.chestArmor ? (
            <button
              className={styles.equippedItem}
              onClick={() => handleItemClick(equippedItems.chestArmor)}>
              {equippedItems.chestArmor.name}
            </button>
          ) : (
            <span className={styles.emptySlot}>Empty</span>
          )}
        </div>

        <div className={styles.gloveLeft}>
          <strong>Left Glove:</strong>
          {equippedItems.gloves ? (
            <button
              className={styles.equippedItem}
              onClick={() => handleItemClick(equippedItems.gloves)}>
              {equippedItems.gloves.name}
            </button>
          ) : (
            <span className={styles.emptySlot}>Empty</span>
          )}
        </div>

        <div className={styles.gloveRight}>
          <strong>Right Glove:</strong>
          {equippedItems.gloves ? (
            <button
              className={styles.equippedItem}
              onClick={() => handleItemClick(equippedItems.gloves)}>
              {equippedItems.gloves.name}
            </button>
          ) : (
            <span className={styles.emptySlot}>Empty</span>
          )}
        </div>

        <div className={styles.boots}>
          <strong>Boots:</strong>
          {equippedItems.boots ? (
            <button
              className={styles.equippedItem}
              onClick={() => handleItemClick(equippedItems.boots)}>
              {equippedItems.boots.name}
            </button>
          ) : (
            <span className={styles.emptySlot}>Empty</span>
          )}
        </div>

        <div className={styles.weapon}>
          <strong>Weapon:</strong>
          {equippedItems.weapon ? (
            <button
              className={styles.equippedItem}
              onClick={() => handleItemClick(equippedItems.weapon)}>
              {equippedItems.weapon.name}
            </button>
          ) : (
            <span className={styles.emptySlot}>Empty</span>
          )}
        </div>
        <div className={styles.passives}>
          <strong>Passives:</strong>
          {equippedItems.passives.length > 0 ? (
            equippedItems.passives.map((passive) => (
              <button
                key={passive.id}
                className={styles.equippedItem}
                onClick={() => handleItemClick(passive)}>
                {passive.name}
              </button>
            ))
          ) : (
            <span className={styles.emptySlot}>None</span>
          )}
        </div>
      </div>

      <h2 className={styles.title}>Inventory</h2>
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
    </div>
  );
};

export default InventoryUI;
