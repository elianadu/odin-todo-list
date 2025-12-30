export const loadHome = () => {
    const contentDiv = document.querySelector("div#content");
    const nameElem = document.createElement("div");
    const descElem = document.createElement("p");
    const welcomeElem = document.createElement("h1")
    const welcome = "Welcome to "
    const name = "Hell's Kitchen";
    const desc = "The premier restaurant of the Underworld... our food is to die for!";

    welcomeElem.textContent = welcome;
    nameElem.textContent = name;
    nameElem.classList.add("restaurantName");
    descElem.textContent = desc;

    welcomeElem.append(nameElem);
    contentDiv.append(welcomeElem);
    contentDiv.append(descElem);
}