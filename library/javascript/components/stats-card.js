let statsCards = document.querySelectorAll(".ui.stats-card");

for (let card of statsCards) {
	  let flex = card.querySelector(".flex");
	  let info = flex.querySelector(".info");

	  for (let key of Object.keys(paths)) {
		      let keyNode = info.querySelector(`.${key}`);
		      let imageContainer = keyNode.querySelector(".icon");
		      let image = document.createElement("img");
		      image.setAttribute("src", paths[key]);
		      imageContainer.append(image);
		    }
}