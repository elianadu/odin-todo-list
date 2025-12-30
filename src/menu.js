export const loadMenu = () => {
    const contentDiv = document.querySelector("div#content");
    const name = "Menu";
    const menuItems = [
  {
    name: "Pomegranate-Glazed Ribs",
    description: "Fall-off-the-bone ribs with a sweet-tart glaze. Warning: May bind you to this establishment forever.",
    price: 18.99
  },
  {
    name: "Asphodel Meadow Salad",
    description: "Mixed greens with edible flowers, goat cheese, and honey vinaigrette from the fields of eternity.",
    price: 12.99
  },
  {
    name: "River Styx Squid Ink Pasta",
    description: "Black as the waters of the underworld, served with garlic, chili, and a crossing fee of your choosing.",
    price: 16.99
  }
];
    const nameElem = document.createElement("h1");
    nameElem.textContent = name;
    contentDiv.append(nameElem);

    for (let item of menuItems) {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("menu-item");
        let itemNameDiv = document.createElement("div");
        let itemDescDiv = document.createElement("div");
        let itemPriceDiv = document.createElement("div");
        itemNameDiv.textContent = item.name;
        itemNameDiv.classList.add("item-name");
        itemDescDiv.textContent = item.description;
        itemDescDiv.classList.add("item-desc");
        itemPriceDiv.textContent = item.price;
        itemPriceDiv.classList.add("item-price");
        itemDiv.append(itemNameDiv);
        itemDiv.append(itemDescDiv);
        itemDiv.append(itemPriceDiv);
        contentDiv.append(itemDiv);
    }
}