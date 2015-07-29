var numSliders;
var currentImage = 0;
var slideTimer = 0;
var slideDuration = 3000;
var nextImage = 0;
var animating = false;
var slideOnDuration = 1000;
var slideOffDuration= 2500;

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
      }
    });
  }
  
  //Position discs
  var slideCenter = parseInt($("#slideshow").css("width"))/2;
  var discsCenter = parseInt($("#slideDiscs").css("width"))/2;
  slideCenter = slideCenter - discsCenter;
  slideCenter += "px";
  $("#slideDiscs").css("left", slideCenter);
}

function initSlideImgs(){
  //Place all images to the right of the viewport
  var slideWidth = parseInt($("#slideshow").css("width"));
  $("#slideshow img").css({
      left:  slideWidth + "px",
      zIndex: 1
      });
  //Place the current image (should be 0) in the viewport
  $("#slideshow img").eq(currentImage).css({
      left: "0px",
      zIndex: 2
      });
  $("#slideDiscs li").eq(currentImage).addClass("selected");
  //$("#slideDiscs li").eq(currentImage).css("color", "white");
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
      return;
    }
    //Otherwise, set the next Image as the forced image
    nextImage = parseInt(forcedImage);
  }
  
      $("#slideshow img").eq(currentImage).css("z-index", 1);
      $("#slideshow img").eq(nextImage).css("z-index", 2);
      var slideWidth = parseInt($("#slideshow").css("width"));
      slideWidth += "px";
    //place all Images just off to the right
    $("#slideshow img").css("left", slideWidth);
    //re-place current image in the viewport
    $("#slideshow img").eq(currentImage).css("left", "0px");
  
  
  //Animate current image to the left;

  $("#slideshow img").eq(currentImage).animate({left: "-"+slideWidth}, slideOffDuration, function(){
      
      });
  
  //animate next image to the viewport from the right
  $("#slideshow img").eq(nextImage).animate({left: "0px"}, slideOnDuration, function(){

    //set the appropriate disc to filled
    $("#slideDiscs li").css("color", "");
    //$("#slideDiscs li").eq(currentImage).css("color", "white");
    $("#slideDiscs li").removeClass("selected");
    $("#slideDiscs li").eq(nextImage).addClass("selected");
      $("#slideshow img").eq(currentImage).finish();
      //place all Images just off to the right
      $("#slideshow img").css("left", slideWidth);
      //end slideOff animation
      //re-place current image in the viewport
      $("#slideshow img").eq(nextImage).css("left", "0px");      
    
    //set the current image to the image that has just filled the viewport
    currentImage = parseInt(nextImage);
    //Finished the animation, accept clicks again.
    animating = false;
    resetTimer();
    
  } );

  
}



$(function(){
  initDiscs();
  initSlideImgs();
  slideTimer = setInterval(showNextImage, slideDuration);
});
