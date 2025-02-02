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
  inventory: Item[];
  equipment: EquippedItems;

  constructor(name: string = "Player") {
    this.name = name;
    this.inventory = [];
    this.equipment = {
      weapon: null,
      helmet: null,
      chestArmor: null,
      gloves: null,
      boots: null,
      passives: [],
    };
  }

  addItem(item: Item) {
    if (!item?.id) return;
    this.inventory.push(item);
  }

  removeItem(item: Item) {
    this.inventory = this.inventory.filter((i) => i.id !== item.id);
  }

  equipItem(item: Item) {
    if (item.type === "passive") {
      this.equipment.passives.push(item);
    } else {
      this.equipment[item.type] = item;
    }
    this.removeItem(item);
  }

  unequipItem(item: Item) {
    if (item.type === "passive") {
      this.equipment.passives = this.equipment.passives.filter(
        (p) => p.id !== item.id
      );
    } else {
      this.equipment[item.type] = null;
    }
    this.addItem(item);
  }

  getEquipment(): EquippedItems {
    return { ...this.equipment };
  }

  clone(): Player {
    const cloned = new Player(this.name);
    cloned.inventory = [...this.inventory];
    cloned.equipment = {
      weapon: this.equipment.weapon,
      helmet: this.equipment.helmet,
      chestArmor: this.equipment.chestArmor,
      gloves: this.equipment.gloves,
      boots: this.equipment.boots,
      passives: [...this.equipment.passives],
    };
    return cloned;
  }
}
