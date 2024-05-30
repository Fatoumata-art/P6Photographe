/* eslint-disable no-undef */
//Mettre le code JavaScript lié à la page photographer.html


//récupération du url id
const queryString = document.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
console.log(id)
async function getPhotographer() {
// get photographers data with fetch
const photographerData = await fetch('./data/photographers.json')
.then((data) => data.json());

// extract photographer object
const photographer = photographerData.photographers.find(
(photographer) => photographer.id == id
)
return photographer
}

function displayBanner(data){
  const photographBanner = document.querySelector('.photograph-header');
  const photographerModel = photographerFactory(data);  //no-undef ESLint def in factories/photographer.js
  const bannerDOM = photographerModel.getPhotographerBannerDOM();
  photographBanner.appendChild(bannerDOM);
 
}
async function getPhotographerMediaList(sortMedia = 'popularity') {
  
  const parameters = new URLSearchParams(window.location.search)
  const idString = parameters.get('id');

  const photographerData = await fetch('./data/photographers.json')
  .then(response => response.json())
  
// extract media objects by photographer ID
const mediaList = photographerData.media.filter(
mediaPage => mediaPage.photographerId == idString
)
// sort the media by the specified property for filtering options
if (sortMedia === 'popularity') {
  mediaList.sort((a, b) => b.likes - a.likes);
} else if (sortMedia === 'date') {
  mediaList.sort((a, b) => new Date(b.date) - new Date(a.date));
} else if (sortMedia === 'title') {
  mediaList.sort((a, b) => a.title.localeCompare(b.title));
}

return mediaList;
  
}

// price  photographer
async function displayCounts(photographer) {
  const main = document.getElementById('main');
  const countDOM = document.createElement('div');
  countDOM.classList.add('counter');
  

  // Get all divs with the class .photograph-media-likes-count
  const likesList = document.querySelectorAll('.photograph-media-likes-count');
  let totalLikes = 0;
  // Iterate through each div and add up the total likes
  likesList.forEach(likesDiv => {
    const likes = parseInt(likesDiv.textContent);
    totalLikes += likes;
  });

  countDOM.innerHTML =
    `<div class="counter-likes">
        ${totalLikes} <i class="fas fa-heart"></i>
    </div>
    <div class="counter-daily">
        ${photographer.price} <span>€ /jour</span>
    </div>`;

    main.appendChild(countDOM);
}
// Get the select element and add an event listener to it
const filterSelect = document.querySelector('#filter-select');
filterSelect.addEventListener('change', (event) => {
  // Get the selected option value
  const sortMedia = event.target.value;

  // Update the URL with the selected option value
  const parameters = new URLSearchParams(window.location.search);
  parameters.set('sort', sortMedia);
  window.location.search = parameters.toString();

  // Update the selected option in the filter button
  filterSelect.value = sortMedia;
});


// medias sorted by...
async function displaySortedMedia(media) {
  const mediaContainer = document.querySelector('.photograph-body');
 
  if (mediaContainer) {
    media.forEach((mediaObj, index) => {
      const mediaModel = mediaFactory(mediaObj); //no-undef ESLint def in factories/media.js
      const mediaDOM = mediaModel.getMediaDOM();
     //console.log("mediaDOM", mediaDOM);
      
      // display lightbox
      const mediaLightbox = mediaDOM.querySelector('.linkMedia');
      //console.log("mediaDOM", mediaLightbox);
      mediaLightbox.addEventListener('click', function(e){
        e.preventDefault();
      
        openLightbox(media, index); 
      })
  
      mediaContainer.appendChild(mediaDOM);

     
  })
  }
  
}


 


async function init() {


const photograph = await getPhotographer();

// Get the sort filter from the URL parameters
const parameters = new URLSearchParams(window.location.search);
const sortMedia = parameters.get('sort');
const photographmMediaList = await getPhotographerMediaList(sortMedia);
  displaySortedMedia(photographmMediaList);
 
  displayBanner(photograph);
  // button contater moi
const buttonMouseover = document.querySelector(".contact_button");
buttonMouseover.addEventListener("mouseover", function(){
    buttonMouseover.style.backgroundColor="#D3573C";
    buttonMouseover.style.color="black";
});

const buttonMouseout = document.querySelector(".contact_button");
buttonMouseout.addEventListener("mouseout", function(){
    buttonMouseout.style.backgroundColor="#901C1C";
    buttonMouseout.style.color="white";
});


  // Adding photographer's name into contact modal form 
 
  const contactModalName = document.getElementById('photographerName');
  contactModalName.innerHTML = ` ${photograph.name}`;

  //displayMedia();
  displayCounts(photograph);

  // Set the selected option in the filter button based on the URL parameter
  if (sortMedia === 'date') {
    filterSelect.selectedIndex = 1;
  } else if (sortMedia === 'title') {
    filterSelect.selectedIndex = 2;
  } else {
    filterSelect.selectedIndex = 0;
  }
  
  const div = document.querySelector('.filter-container');
  const icon = div.querySelector('.container-icon');
  //const selectBtn = div.querySelector('.filter-containe');
  console.log(icon);
  div.addEventListener("click", () => {
    div.classList.toggle("active");
  })
 
}
  
  
init();  
