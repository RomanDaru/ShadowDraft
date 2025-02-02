// data/heroes.ts - List of available heroes and Hero type

// Define the Hero type
export interface Hero {
  id: number;
  name: string;
  attack: number;
  defense: number;
  special: string;
}

// Export the heroes array
export const heroes: Hero[] = [
  {
    id: 1,
    name: "Shadowblade",
    attack: 15,
    defense: 8,
    special: "Critical Strike",
  },
  {
    id: 2,
    name: "Arcane Sage",
    attack: 10,
    defense: 5,
    special: "Mana Regeneration",
  },
  {
    id: 3,
    name: "Ironclad Warrior",
    attack: 12,
    defense: 12,
    special: "Shield Block",
  },
  {
    id: 4,
    name: "Stormcaller",
    attack: 14,
    defense: 6,
    special: "Chain Lightning",
  },
  { id: 5, name: "Phantom Dancer", attack: 13, defense: 7, special: "Evasion" },
];
