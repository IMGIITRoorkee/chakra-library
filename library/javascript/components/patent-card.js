function addExpansionOverlay(card) {
    const expandButton = card.getElementsByClassName("ui icon")[0]
    const imgDiv = card.getElementsByClassName("ui image")[0]
    const img = imgDiv.querySelectorAll("img")[0]
    const fullscreenImg = img.cloneNode();
    const overlay = document.createElement("div");
    overlay.classList.add("expansion-overlay")
    if (fullscreenImg) {
        fullscreenImg.style.width = "80vw";
        fullscreenImg.style.height = "80vh";
        fullscreenImg.style.height = "auto";
        fullscreenImg.style.objectFit = "contain";
        fullscreenImg.style.cursor = "default";
        overlay.appendChild(fullscreenImg);
        document.body.appendChild(overlay);
    }
    if (expandButton) {
        expandButton.addEventListener("click", () => {
            console.log("yipeee")
            overlay.style.visibility = "visible";
        });
    }
    if (overlay) {
        overlay.addEventListener("click", (event) => {
            if (event.target === overlay) {
                overlay.style.visibility = "hidden";
            }
        }
        );
    }
}

const patentCards = document.querySelectorAll('.ui.patent-card')
patentCards.forEach(card => addExpansionOverlay(card))
