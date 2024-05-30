// diplay the media lightbox

function showMedia(media) {
  const lightbox = document.querySelector('.lightbox');
  lightbox.setAttribute('aria-hidden', 'false');
  lightbox.style.display = 'block';

  document.querySelector('.lightbox').setAttribute('aria-hidden', 'false');
  let img = lightbox.querySelector('.lightbox-container img');
  let video = lightbox.querySelector('.lightbox-container video');
  const captionText = lightbox.querySelector(".caption");

  if(media.video){
    //video
    video.alt = media.title;
    video.setAttribute('role', 'video');
    video.setAttribute("controls", "")
    video.setAttribute("autoPlay", "")
    video.src = `assets/images/${media.photographerId}/${media.video}`;
    video.style = "display: block";
    img.style = "display: none;"; 
  } else{
    // picture
   img.src = `assets/images/${media.photographerId}/${media.image}`;
  img.alt = media.title;
  img.setAttribute('role', 'img');
   img.style = "display: block;";
   video.style = "display: none;";
 }
  captionText.innerHTML = media.title;
}

// OPEN
// eslint-disable-next-line no-unused-vars
function openLightbox(mediaList, index) { // EsLint error openlightbox is called in media.js
  let media = mediaList[index];
  console.log(" media = ", media);
    // display the lightbox with the clicked image
    const main = document.querySelector('.main');
    main.setAttribute('aria-hidden', 'false');
    main.style = "display: none;";
    const lightbox = document.querySelector('.lightbox');
    const nextButton = lightbox.querySelector(".lightbox-next");
    const prevButton = lightbox.querySelector(".lightbox-prev");
    
    nextButton.setAttribute('role', 'button')
    nextButton.setAttribute('aria-label', 'next media')
    nextButton.ariaLabel ="photo suivante";
    nextButton.tabIndex ="1"
    nextButton.addEventListener('click', next)

    if (index == 0) { // debut de liste
      // pas afficher button previous
      prevButton.style.display = "none";
    }

    if (index + 1 == mediaList.length) { // fin de liste
      // pas afficher next button
      nextButton.style.display = "none";
    }

    function next () { 
      if (index + 1 < mediaList.length) {
        index++;
        media = mediaList[index];
        console.log("test",media)
        showMedia(media);

        if(index + 1 < mediaList.length){
          nextButton.style.display = "block";
          //nextButton.tabIndex = "-1";
        } else {
          nextButton.style.display = "none";
        }

        prevButton.style.display = "block";
        
      } 
    }

    prevButton.setAttribute('role', 'button')
    prevButton.setAttribute('aria-label', 'previous media')
    prevButton.addEventListener('click', previous )

    function previous() {
      if (index > 0) {
        index--;
        media = mediaList[index];
        showMedia(media);
       if (index - 1 > 0) {
         prevButton.style.display = "block";
       } else {
        prevButton.style.display = "none";
       }

       nextButton.style.display = "block";

      }    
    }

    // add an event listener for the escape key
document.addEventListener('keydown', handleKeyPress);
// KEYBOARD
function handleKeyPress(event) {
  // check if the escape key was pressed
  if (event.keyCode === 27) {
    const lightbox = document.querySelector('.lightbox');
    lightbox.style.display = "none";
    const main = document.querySelector('.main');
    main.style = "display: block;";
    
  }
  // check if left arrow key was pressed
  if (event.keyCode === 37) {
    previous();
  }
  // check if right arrow key was pressed
  if (event.keyCode === 39) {
    next();
  }
  // check if right arrow key was pressed
  // if (event.keyCode === "Enter") {
  //   showMedia(media);
  // }

}

     showMedia(media);
     closeLightbox()
 
}


function closeLightbox(){
   // add an event listener to the close button
  const closeButton = document.querySelector('.lightbox-close');
  closeButton.setAttribute('aria-label', 'close')
  if (closeButton) {
    closeButton.addEventListener('click', function (){
      // hide the lightbox
    document.querySelector('.lightbox').style.display = "none";
    document.querySelector('.lightbox').setAttribute('aria-hidden', 'true');

    const main = document.querySelector('.main');
    main.setAttribute('aria-hidden', 'true');
    main.style = "display: block;";

    // reset the video element to stop playback
    const video = document.querySelector('.photograph-media-video');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    })  
  }
}