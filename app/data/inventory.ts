// data/inventory.ts - Inventory system

import { Item } from "./items";

// Definícia inventára ako zoznam predmetov
export class Inventory {
  private items: Item[] = [];

  // Pridanie predmetu do inventára
  addItem(item: Item): void {
    if (this.items.length >= 10) {
      console.log("Inventory full! Cannot add more items.");
      return;
    }
    this.items.push(item);
    console.log(`Added item: ${item.name}`);
  }

  // Získanie zoznamu predmetov v inventári
  getItems(): Item[] {
    return this.items;
  }

  // Odstránenie predmetu (ak by sme chceli napr. predaj alebo výmenu)
  removeItem(itemId: number): void {
    this.items = this.items.filter((item) => item.id !== itemId);
    console.log(`Removed item with ID: ${itemId}`);
  }
}
