// data/pack.ts - Pack Opening Logic
import { generalItems, classItems, Item } from "./items";
import { Player } from "./player";

export function openPack(player: Player): Item[] {
  const selectedItems: Item[] = [];

  // Function to pick a random item from a pool
  const getRandomItem = (pool: Item[], rarity: string): Item => {
    const filtered = pool.filter((item) => item.rarity === rarity);
    return filtered[Math.floor(Math.random() * filtered.length)];
  };

  // Select items for the pack
  selectedItems.push(
    getRandomItem(
      [
        ...generalItems,
        ...classItems.filter((i) => i.classSpecific === player.name),
      ],
      "rare"
    )
  ); // 1 Rare
  selectedItems.push(getRandomItem(generalItems, "uncommon")); // 1 Uncommon
  selectedItems.push(getRandomItem(generalItems, "uncommon")); // 1 Uncommon
  selectedItems.push(getRandomItem(generalItems, "common")); // 1 Common
  selectedItems.push(getRandomItem(generalItems, "common")); // 1 Common

  return selectedItems;
}
