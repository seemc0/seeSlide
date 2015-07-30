# seeSlide.js

A lightweight JavaScript & jQuery carousel-style slide show.

Demo: www.gravitymedia.co.za/seeSlide/

Please feel free to use and manipulate this code. I don't require any attribution, but a mention in your code comments would be great. I take no responsibility for how seeSlide will react with your project, so use it at your own risk.

# Installation

Download seeSlide.js and seeSlide.css from the "js" and "styles" subfolders respectively.
Link them to your project like so:

```
<script type="text/javascript" src="js/seeSlide.js"></script>
<link rel="stylesheet" href="styles/seeSlide.css" />
```

Download and link your project to the latest version of jQuery.

```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
```

#Activating seeSlide.js

Create a div with an id of "seeSlide" and populate it with your slide show images.

```
<div id="seeSlide">
  <img src="images/1.jpg" />
  <img src="images/2.jpg" />
  <img src="images/3.jpg" />
  <img src="images/4.jpg" />
</div>
```

#That's it

There are some config options in the seeSlide.js file, which you can change to suit the look and feel of your project. Also, the seeSlide.css file contains the styles for the navigation arrows and discs. At the moment, these are just basic html elements: left-and-right-angled quotes (&laquo; and &raquo;) for the arrows and disc-and-circle style list items for the discs.

