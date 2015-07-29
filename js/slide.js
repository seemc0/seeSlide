var numSliders;
var currentImage = 0;
var slideTimer = 0;
var slideDuration = 3000;
var nextImage = 0;
var animating = false;

function resetTimer(){
      clearInterval(slideTimer);
      slideTimer = setInterval(showNextImage, slideDuration);
}

function initDiscs(){
  var discs = $("<ul id='slideDiscs'></ul>");
  numSliders = $("#slideshow img").length;
  for (i = 0; i<numSliders; i++){
    discs.append("<li data-ref='" + i + "'> </li>");
  }
  $("#slideshow").prepend(discs);
  for (i = 0; i<numSliders; i++){
    //If a disc is clicked
    $("#slideDiscs li").eq(i).on("click", function(){
      forcedImage = $(this).attr("data-ref");
      //If the slideshow is in the process of animating, ignore the request.
      if (!animating) {
        //Otherwise show the next image
        showNextImage(forcedImage);
        resetTimer();
      } else {
        $("#debug").append("Animating, request ignored");
      }
      
    });
  }
}

function initSlideImgs(){
  //Place all images to the right of the viewport
  $("#slideshow img").css("left", "800px");
  //Place the current image (should be 0) in the viewport
  $("#slideshow img").eq(currentImage).css("left", "0px");
  $("#slideDiscs li").eq(currentImage).css("color", "white");
}


function showNextImage(forcedImage){
  
  animating = true;
  if (forcedImage === undefined){
    //Standard procedure, nextImage is currentImage + 1, unless current image is last image
    nextImage = parseInt(currentImage + 1);
    if (nextImage == numSliders){
      nextImage = 0;
    }
  } else {
    //if the user has chosen the currently displayed image, ignore the request.
    if (forcedImage == currentImage){
      $("#debug").append("Forced Image same as Current, request ignored");
      return;
    }
    //Otherwise, set the next Image as the forced image
    nextImage = parseInt(forcedImage);
  }
  

  
  
  $("#debug").append("Next Image: " + nextImage + "<br />");

  ///Place next image off to the right - this will be unnecessary when the end animate function calls the move of all images to the right
  //$("#slideshow img").eq(nextImage).css("left", "800px");
  //Animate current image to the left;
  $("#slideshow img").eq(currentImage).animate({left: "-800px"}, 1000);
  
  //animate next image to the viewport from the right
  $("#slideshow img").eq(nextImage).animate({left: "0px"}, 1000, function(){
    //place all Images just off to the right
    $("#slideshow img").css("left", "800px");
    //re-place current image in the viewport
    $("#slideshow img").eq(currentImage).css("left", "0px");
    //set the appropriate disc to filled
    $("#slideDiscs li").css("color", "");
    $("#slideDiscs li").eq(currentImage).css("color", "white");
    //Finished the animation, accept clicks again.
    animating = false;
    resetTimer();
    
  } );
    //set the current image to the image that has just filled the viewport
    currentImage = parseInt(nextImage);
    $("#debug").append("Current: " + currentImage + "<br />");

  
  
  
}

$(function(){
  initDiscs();
  initSlideImgs();
  slideTimer = setInterval(showNextImage, slideDuration);
});
