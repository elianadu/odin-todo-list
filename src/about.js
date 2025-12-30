export const loadAbout = () => {
    const contentDiv = document.querySelector("div#content");
    let desc = document.createElement("div");
    desc.classList.add("about-desc");

    const heading = document.createElement("h1");
    heading.textContent = "About Us";
    contentDiv.append(heading);
    
    const intro = document.createElement("p");
    intro.textContent = "Welcome to the Underworld's premier dining destination. We've been serving the dearly departed since the beginning of time itself.";
    desc.append(intro);
    
    const story = document.createElement("p");
    story.textContent = "What started as a humble pomegranate cart has blossomed into the afterlife's most talked-about eatery. Our chef trained under the finest culinary masters of the ancient world (they're all here now).";
    desc.append(story);
    
    const fame = document.createElement("p");
    fame.textContent = "Famous visitors include Persephone herself, who stops by every spring before heading topside. She says our pomegranate dishes still can't compare to that fateful first bite, but she keeps coming back anyway.";
    desc.append(fame);
    
    const tagline = document.createElement("p");
    tagline.textContent = "Die for our food. Stay for eternity.";
    tagline.classList.add("tagline");
    desc.append(tagline);
    contentDiv.append(desc);
}