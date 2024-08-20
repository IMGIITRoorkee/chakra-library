var src = "https://cmsredesign.channeli.in/"
const rightArrow = src + "library/assets/icons/carouselright.svg"
const leftArrow = src + "library/assets/icons/carouselleft.svg"

// Hash function
// Returns a hash of argument length
function makeHash(length) {
  let result = ""
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
let intervalID


// THIS FUNCTION REORDERS SLIDES by either inserting the last slide to first or
// first slide to last
const reorderSlides = (sliderHash, numCards, isLeft) => {
  

  const sliderElement = document.getElementById(sliderHash);
  const container = sliderElement.getElementsByClassName("container")[0];
  const cards = container.children;

  const totalNumberOfCards = cards.length;

  if (numCards < 1) {
    return;
  }

  // Calculate animation step and direction
  const cardWidth = cards[0].offsetWidth;
  const animationStep = isLeft ? cardWidth : -cardWidth;

  let currentPosition = 0;
  let newPosition = currentPosition + animationStep;

  const animationDuration = 700; 
  const framesPerSecond = 60;
  const totalFrames = Math.ceil(animationDuration / (700 / framesPerSecond));
  const frameStep = animationStep / totalFrames;
  let animationStopped = false; // Flag to track animation state

  

  const animate = () => {
    if (!animationStopped) {
    currentPosition += frameStep;
    container.style.transform = `translateX(${currentPosition}px)`;
    
  


    if (Math.abs(currentPosition) >= Math.abs(animationStep)) {
     
      if (isLeft) {

           if (totalNumberOfCards <= numCards) {
      return
    }
    if (totalNumberOfCards > numCards) {
      cards[numCards - 1].style.display = "none"
    }
    const lastCard = cards[totalNumberOfCards - 1]
    if (lastCard.classList.contains("image-description-card")) {
      lastCard.style.display = "flex"
    } else {
      lastCard.style.display = "block"
    }
    container.insertBefore(lastCard, container.firstChild)
        

        
      } else {
        if (totalNumberOfCards <= numCards) {
          return
        }
        // Put first card to the bottom
        const firstChild = cards[0]
        if (totalNumberOfCards > numCards) {
          firstChild.style.display = "none"
        }
        cards[numCards].style.display = "block"
        if (cards[numCards].classList.contains("image-description-card")) {
          cards[numCards].style.display = "flex"
        } else {
          cards[numCards].style.display = "block"
        }
        container.appendChild(firstChild)
        
      
      }
      container.style.transform = "translateX(0)";
      currentPosition = 0;
        animationStopped = true; // Pause animation after completing a cycle
       
      
      return;
    }
    }

    if (Math.abs(currentPosition) < Math.abs(animationStep)) {
      requestAnimationFrame(animate);
    }
  };

  animate();
  
};

const renderSlides = (hash, numberOfCards) => {
  const sliderElement = document.getElementById(hash)
  const container = sliderElement.getElementsByClassName("container")[0]
  const cards = container.children
  for (let i = 0; i < cards.length; ++i) {
    if (i < numberOfCards) {
      if (cards[i].classList.contains("image-description-card")) {
        cards[i].style.display = "flex"
      } else {
        cards[i].style.display = "block"
      }
    } else cards[i].style.display = "none"
  }
}

// FUNCTION TO CALCULATE THE NUMBER OF CARDS

const numberOfCardsToDisplay = (sliderHash) => {
  const sliderElement = document.getElementById(sliderHash)

  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  )
  const px = Math.ceil((vw * 10) / 100)

  const container = sliderElement.getElementsByClassName("container")[0]
  // Handle the case when the slider has no cards
  if (container.children.length === 0) {
    return 0
  }
  const card = container.firstElementChild
  const numberOfCards = Math.floor(
    (sliderElement.clientWidth - px) / card.offsetWidth
  )
  const ret = numberOfCards > 1 ? numberOfCards : 1
  return ret
}

const sliderMap = {}


window.addEventListener("load", function (e) {
  const sliders = document.querySelectorAll(".ui.slider")
  for (let i = 0; i < sliders.length; ++i) {
    const hash = makeHash(10)
    sliders[i].id = hash
    sliderMap[hash] = 1
    const outerContainer = document.createElement("div")
    outerContainer.className = "outer-container"; 

    const container = document.createElement("div")
    container.className = "container"
   
    let card = sliders[i].firstChild

    while (card) {
      container.appendChild(card)
      card = sliders[i].firstChild
    }
    


    const leftArrowContainer = document.createElement("div")
    leftArrowContainer.className = "left-arrow-container"
    container.className = "container"
    

    const leftArrowElement = document.createElement("img")
    leftArrowElement.className = "arrow"
    leftArrowElement.setAttribute("src", leftArrow)
    leftArrowContainer.appendChild(leftArrowElement)

    const rightArrowContainer = document.createElement("div")
    rightArrowContainer.className = "right-arrow-container"

    const rightArrowElement = document.createElement("img")
    rightArrowElement.className = "arrow"
    rightArrowElement.setAttribute("src", rightArrow)
    rightArrowContainer.appendChild(rightArrowElement)
    outerContainer.appendChild(container) 

    sliders[i].appendChild(leftArrowContainer)
    // sliders[i].appendChild(container)
    sliders[i].appendChild(outerContainer);
    sliders[i].appendChild(rightArrowContainer)
    
    
    leftArrowElement.addEventListener("click", function (e) {
      e.stopPropagation()
      e.preventDefault()

      if (e.target) {
        reorderSlides(hash, sliderMap[hash], false)
        clearInterval(intervalID);

   
      }
    })

    rightArrowElement.addEventListener("click", function (e) {
      e.stopPropagation()
      e.preventDefault()

      if (e.target) {
        reorderSlides(hash, sliderMap[hash], true)
        clearInterval(intervalID);
       
    
    
      }
    })
   

   
  
   

    images = container.querySelectorAll("img")
    loadedImageCounter = 0
    images.forEach(function (image) {
      image.addEventListener("load", function (e) {
        loadedImageCounter++
        if (loadedImageCounter == images.length) {
          renderSlides(hash, sliderMap[hash])
          sliderMap[hash] = numberOfCardsToDisplay(hash)
          renderSlides(hash, sliderMap[hash])
        }
      })
    })
    
    renderSlides(hash, sliderMap[hash])
    sliderMap[hash] = numberOfCardsToDisplay(hash)
    renderSlides(hash, sliderMap[hash])
    startAutoSlide(hash, sliderMap[hash]);
  }
})


window.addEventListener("beforeunload", function () {
  // Clear any intervals here
  if (intervalID) clearInterval(intervalID)
})
const startAutoSlide = (sliderHash, numCards) => {
  intervalID = setInterval(() => {
    reorderSlides(sliderHash, numCards, false);
  }, 8000);
};


var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutationRecord) {
    const sliders = document.querySelectorAll(".ui.slider")
    if (sliders === null) {
      return
    }
    for (let i = 0; i < sliders.length; i++) {
      const hash = sliders[i].id
      sliderMap[hash] = numberOfCardsToDisplay(hash)

      renderSlides(hash, sliderMap[hash])
    }
  })
})

var elements = document.querySelectorAll(".content")

elements.forEach((element) =>
  observer.observe(element, {attributes: true, attributeFilter: ["style"]})
)

window.onresize = () => {
  const sliders = document.querySelectorAll(".ui.slider")
  if (sliders === null) {
    return
  }
  for (let i = 0; i < sliders.length; i++) {
    const hash = sliders[i].id
    sliderMap[hash] = numberOfCardsToDisplay(hash)

    renderSlides(hash, sliderMap[hash])
  }
  
}

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};


const debouncedReload = debounce(() => {
  location.reload();
}, 500);

window.addEventListener("resize", function() {
  debouncedReload();
});
