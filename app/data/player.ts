import { Item } from "./items";

export interface EquippedItems {
  weapon: Item | null;
  helmet: Item | null;
  chestArmor: Item | null;
  gloves: Item | null;
  boots: Item | null;
  passives: Item[];
}

export class Player {
  name: string;
  inventory: Item[] = []; // ✅ Inventory should store an array of items
  equipment: {
    weapon: Item | null;
    helmet: Item | null;
    chestArmor: Item | null;
    gloves: Item | null;
    boots: Item | null;
    passives: Item[];
  };

  constructor(name: string) {
    this.name = name;
    this.equipment = {
      weapon: null,
      helmet: null,
      chestArmor: null,
      gloves: null,
      boots: null,
      passives: [],
    };
  }

  // ✅ Restore inventory functions
  addItem(item: Item) {
    this.inventory.push(item);
  }

  removeItem(itemId: number) {
    this.inventory = this.inventory.filter((item) => item.id !== itemId);
  }

  getItems(): Item[] {
    return this.inventory;
  }

  equipItem(item: Item) {
    if (item.type === "weapon") this.equipment.weapon = item;
    else if (item.type === "armor") {
      if (item.name.includes("Helmet")) this.equipment.helmet = item;
      else if (item.name.includes("Chest")) this.equipment.chestArmor = item;
      else if (item.name.includes("Gloves")) this.equipment.gloves = item;
      else if (item.name.includes("Boots")) this.equipment.boots = item;
    } else if (item.type === "passive") {
      this.equipment.passives.push(item);
    }
    this.removeItem(item.id); // ✅ Remove from inventory when equipped
  }

  unequipItem(item: Item) {
    if (item.type === "weapon" && this.equipment.weapon?.id === item.id)
      this.equipment.weapon = null;
    else if (item.type === "armor") {
      if (this.equipment.helmet?.id === item.id) this.equipment.helmet = null;
      if (this.equipment.chestArmor?.id === item.id)
        this.equipment.chestArmor = null;
      if (this.equipment.gloves?.id === item.id) this.equipment.gloves = null;
      if (this.equipment.boots?.id === item.id) this.equipment.boots = null;
    } else if (item.type === "passive") {
      this.equipment.passives = this.equipment.passives.filter(
        (p) => p.id !== item.id
      );
    }
    this.addItem(item); // ✅ Return item to inventory when unequipped
  }

  getEquipment(): EquippedItems {
    return this.equipment;
  }

  clone(): Player {
    const clonedPlayer = new Player(this.name);
    clonedPlayer.inventory = [...this.inventory];
    clonedPlayer.equipment = { ...this.equipment };
    // Clone other properties if needed
    return clonedPlayer;
  }
}
