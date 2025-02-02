// data/items.ts - Expanded Item Pool with Durability
export type ItemType = "weapon" | "armor" | "passive";
export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export interface Item {
  id: number;
  name: string;
  type: ItemType;
  attack?: number;
  defense?: number;
  specialEffect?: string;
  rarity: Rarity;
  classSpecific?: string;
  durability?: number; // ✅ New durability attribute
}

// General Items (Available for all classes)
export const generalItems: Item[] = [
  {
    id: 1,
    name: "Rusty Sword",
    type: "weapon",
    attack: 8,
    rarity: "common",
    durability: 10,
  },
  {
    id: 2,
    name: "Iron Dagger",
    type: "weapon",
    attack: 6,
    specialEffect: "Fast attack speed",
    rarity: "common",
    durability: 15,
  },
  {
    id: 3,
    name: "Steel Sword",
    type: "weapon",
    attack: 12,
    rarity: "uncommon",
    durability: 20,
  },
  {
    id: 4,
    name: "Reinforced Shield",
    type: "armor",
    defense: 15,
    rarity: "uncommon",
    durability: 25,
  },
  {
    id: 5,
    name: "Leather Armor",
    type: "armor",
    defense: 10,
    rarity: "common",
    durability: 18,
  },
  {
    id: 6,
    name: "Chainmail Vest",
    type: "armor",
    defense: 14,
    rarity: "uncommon",
    durability: 22,
  },
  {
    id: 7,
    name: "Knight's Plate",
    type: "armor",
    defense: 20,
    specialEffect: "Reduces incoming damage by 5%",
    rarity: "rare",
    durability: 30,
  },
  {
    id: 8,
    name: "Battle Boots",
    type: "armor",
    defense: 8,
    rarity: "uncommon",
    durability: 15,
  },
  {
    id: 9,
    name: "Berserker Gloves",
    type: "armor",
    defense: 6,
    specialEffect: "+10% attack speed",
    rarity: "rare",
    durability: 18,
  },
  {
    id: 10,
    name: "Amulet of Strength",
    type: "passive",
    specialEffect: "+5 Attack",
    rarity: "rare",
  },
  {
    id: 11,
    name: "Ring of Agility",
    type: "passive",
    specialEffect: "+10% Dodge Chance",
    rarity: "uncommon",
  },
  {
    id: 12,
    name: "Helmet of Insight",
    type: "armor",
    defense: 7,
    specialEffect: "+5% Critical Hit",
    rarity: "uncommon",
    durability: 20,
  },
];

// Class-Specific Items (Only appear for matching class)
export const classItems: Item[] = [
  {
    id: 13,
    name: "Arcane Staff",
    type: "weapon",
    attack: 15,
    specialEffect: "Mana regeneration",
    rarity: "rare",
    durability: 18,
    classSpecific: "Arcane Sage",
  },
  {
    id: 14,
    name: "Shadow Cloak",
    type: "armor",
    defense: 8,
    specialEffect: "Stealth increase",
    rarity: "uncommon",
    durability: 16,
    classSpecific: "Phantom Dancer",
  },
  {
    id: 15,
    name: "Stormcaller’s Hammer",
    type: "weapon",
    attack: 18,
    specialEffect: "Chain Lightning",
    rarity: "epic",
    durability: 25,
    classSpecific: "Stormcaller",
  },
  {
    id: 16,
    name: "Warrior’s War Axe",
    type: "weapon",
    attack: 20,
    specialEffect: "Cleave Attack",
    rarity: "legendary",
    durability: 30,
    classSpecific: "Ironclad Warrior",
  },
  {
    id: 17,
    name: "Silent Assassin’s Blade",
    type: "weapon",
    attack: 14,
    specialEffect: "+20% Crit Damage",
    rarity: "epic",
    durability: 22,
    classSpecific: "Phantom Dancer",
  },
];
