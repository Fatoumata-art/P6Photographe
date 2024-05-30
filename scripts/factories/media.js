/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars

//explication
function mediaFactory(media){  //is defined but never use /  it's been used into factories/media.js
    const {  title, image, likes, date, price} = media;

    const photo = `assets/images/${media.photographerId}/${media.image}`;
    const video = `assets/images/${media.photographerId}/${media.video}`;

    function getMediaDOM(){

    const mediaSection = document.createElement('section') ;
    mediaSection.classList.add('photograph-section');
  
    const mediaDOM = document.createElement('figure');
    mediaDOM.classList.add('photograph-media');
    mediaDOM.tabIndex="-1"
    mediaSection.appendChild(mediaDOM);
    const linkMedia = document.createElement('a');
    linkMedia.classList.add("linkMedia")
    linkMedia.setAttribute("alt",title+", vue rapprochée");
    
        
       //check if it is img or video
       if(media.video){
            //video
            const videoLoad = document.createElement('video');
            videoLoad.classList.add("photograph-media-video");
            videoLoad.setAttribute("src", video);
            videoLoad.setAttribute('mediaID', `${media.id}`)
            videoLoad.type = 'video/mp4';
            videoLoad.alt = media.title;
            mediaDOM.appendChild(linkMedia);
            linkMedia.appendChild(videoLoad);
            linkMedia.href = ""
            linkMedia.href = `./assets/images/${media.photographerId}/${media.image}`;
            linkMedia.target = 'blank'
            linkMedia.setAttribute("alt",title+", vue rapprochée");

       }else{
             // picture
            const img = document.createElement( 'img' );
            img.classList.add("photograph-media-img");
            img.setAttribute("src", photo);
            img.alt = media.title;
            img.setAttribute('mediaID', `${media.id}`)
            mediaDOM.appendChild(linkMedia);
            linkMedia.appendChild(img);
            linkMedia.href = `./assets/images/${media.photographerId}/${media.image}`;
            linkMedia.target = 'blank'
            linkMedia.setAttribute("alt",title+", vue rapprochée");
       }

       // mediaInfo
      const mediaInfo = document.createElement('div');
      mediaInfo.classList.add('photograph-media-info');
      mediaDOM.tabIndex = "-1";
      mediaDOM.appendChild(mediaInfo);

        
      //title
      const h2 = document.createElement('h2');
      h2.textContent = media.title;
      h2.classList.add("photograph-media-title");
      h2.setAttribute('role', 'heading');
      h2.setAttribute('aria-level', '2');
      h2.tabIndex = "-1 ";
      mediaInfo.appendChild(h2);

      // mediaLikes
      const mediaLikes = document.createElement('div');
      mediaLikes.classList.add('photograph-media-likes');
      mediaInfo.appendChild(mediaLikes);

      // likes per media
      const likeCount = document.createElement('span');
      likeCount.classList.add('photograph-media-likes-count');
      likeCount.innerText = media.likes;
      likeCount.setAttribute('role', 'text');
      mediaLikes.appendChild(likeCount);

       // like button
       const likeButton = document.createElement('i');
       likeButton.classList.add('fa-regular', 'fa-heart');
       likeButton.setAttribute('title', 'coeur pour aimer le média du phtographe')
       mediaLikes.appendChild(likeButton);
       if (media.isLiked) {
         likeButton.classList.add('liked');
       }
       likeButton.addEventListener('click', function () {

         // Handle the click event for adding or removing a like
         if (media.isLiked) {
           media.likes--;
           media.isLiked = false;
          likeButton.classList.remove('fas', 'fa-heart');
          likeButton.classList.add('fa-regular', 'fa-heart')
         } else {
           media.likes++;
           media.isLiked = true;
          likeButton.classList.add('fas', 'fa-heart');
         }
         likeCount.innerText = media.likes;

         // Update the total likes count in .counter
         const likesList = document.querySelectorAll('.photograph-media-likes-count');
         let totalLikes = 0;
         likesList.forEach((likesDiv) => {
           const likes = parseInt(likesDiv.textContent);
           totalLikes += likes;
         });
         const counterLikes = document.querySelector('.counter-likes');
         counterLikes.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`;
       });

        likeButton.setAttribute('role', 'button');
        likeButton.setAttribute('aria-label', 'Like');
        
    
      return mediaDOM
    }

    return  {
        title, photo,getMediaDOM, 
    }
}