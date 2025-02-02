// tests/inventoryTest.ts - Testovanie inventára a equip systému

import { Player } from "../app/data/player";
import { items, Item } from "../app/data/items";

console.log("🔥 Running Inventory & Equipment Test 🔥");

// 1️⃣ Vytvoríme hráča
const player = new Player("Test Hero");

// 2️⃣ Pridáme predmety do inventára
console.log("\n➡ Adding items to inventory...");
player.addItemToInventory(items[0]); // Shadow Katana
player.addItemToInventory(items[2]); // Iron Chestplate
player.addItemToInventory(items[4]); // Regeneration
player.addItemToInventory(items[5]); // Berserker Rage

// 3️⃣ Otestujeme equipovanie
console.log("\n➡ Equipping items...");
player.equipWeapon(items[0]); // Shadow Katana
player.equipChestArmor(items[2]); // Iron Chestplate
player.equipPassive(items[4]); // Regeneration
player.equipPassive(items[5]); // Berserker Rage (mala by byť pridaná ako druhá pasívka)

// 4️⃣ Výpis inventára a vybavenia
console.log("\n📜 Player Inventory:");
console.log(player.inventory.getItems());

console.log("\n🛡 Player Equipment:");
console.log(player.getEquipment());

// 5️⃣ Skúsime pridať ďalšiu pasívnu schopnosť a overíme, či sa pridá do zoznamu
console.log("\n➡ Adding another passive ability...");
const extraPassive: Item = {
  id: 99,
  name: "Stealth Mode",
  type: "passive",
  specialEffect: "Become invisible for 5 sec",
  rarity: "epic",
};
player.equipPassive(extraPassive);

console.log("\n🛡 Updated Player Equipment:");
console.log(player.getEquipment());

// 6️⃣ Skúsime vymazať predmet z inventára
console.log("\n❌ Removing item from inventory...");
player.inventory.removeItem(items[2].id); // Odstráni Iron Chestplate

console.log("\n📜 Updated Player Inventory:");
console.log(player.inventory.getItems());

console.log("\n✅ All tests completed!");
