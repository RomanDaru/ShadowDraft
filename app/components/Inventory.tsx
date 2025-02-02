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

  const renderEquippedItem = (slot: string, item: Item | null) => (
    <div key={slot} className={styles.equipmentSlot}>
      <strong>{slot.charAt(0).toUpperCase() + slot.slice(1)}:</strong>
      {item ? (
        <button
          className={styles.equippedItem}
          onClick={() => handleItemClick(item)}>
          {item.name} (
          {item.durability !== undefined
            ? `${item.durability} Durability`
            : "∞"}
          )
        </button>
      ) : (
        <span className={styles.emptySlot}>Empty</span>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Equipped Items</h2>
      <div className={styles.equipmentGrid}>
        {Object.entries(equippedItems).map(([slot, item]) => {
          if (slot === "passives") {
            return (
              <div key={slot} className={styles.equipmentSlot}>
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
            );
          }

          // Type assertion for slots and items
          const equipmentSlot = slot as keyof Omit<EquippedItems, "passives">;
          const equippedItem = item as Item | null;

          return renderEquippedItem(equipmentSlot, equippedItem);
        })}
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
