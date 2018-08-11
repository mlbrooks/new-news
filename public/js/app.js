// ==============================================================================
// Set Global Variables
// ==============================================================================

var navSliderOpen = false;
var headlinesSliderOpen = false;
var articleSliderOpen = false;
var bundleSliderOpen = false;
var openHeadlinesSliderName = "";

// ==============================================================================
// Controlling Sliders
// ==============================================================================

function openNavSlider() {
  navSliderOpen = true;
  var navSlider = document.getElementById("nav-slider");

  // slide the sider out to the left side of the screen
  navSlider.style.left = "0";

  // add the slider-backdrop class to create a dark opaque background behind the nav slider
  $(".nav-slider-bg").addClass("nav-slider-backdrop");

  // add focus to the open slider
  navSlider.focus();

  // prevent body from being scrollable
  $("body").addClass("lock-scroll");

  // add the shadow effect to the slider
  $(navSlider).addClass("left-side-slider-shadow");

  // enable swipe to close
  enableNavSwipeClose(navSlider);
}

function closeNavSlider() {
  navSliderOpen = false;
  var navSlider = document.getElementById("nav-slider");

  // move the slider so that it is off the screen. The number of pixels must be equal to or greater than what is set in the css
  navSlider.style.left = "-350px";
  $(".nav-slider-bg").removeClass("nav-slider-backdrop");

  $("body").removeClass("lock-scroll");
  $(navSlider).removeClass("left-side-slider-shadow");
}

function openHeadlinesSlider() {
  headlinesSliderOpen = true;
  var currentHeadlinesSlider = document.getElementById(openHeadlinesSliderName + "-slider");

  // slide the slider out to the right side of the screen
  currentHeadlinesSlider.style.right = "0";

  // add the slider-backdrop class to create a dark opaque background behind the side modal
  // slider-bg is specific to each background to keep the opacity from layering
  $("#" + openHeadlinesSliderName + "-slider-bg").addClass("headlines-slider-backdrop");

  // add focus to the current headline slider
  currentHeadlinesSlider.focus();

  // lock the body from scrolling
  $("body").addClass("lock-scroll");

  // add the shadow to the slider
  $(currentHeadlinesSlider).addClass("right-side-slider-shadow");

  // enable swipe to close
  enableHeadlinesSwipeClose(currentHeadlinesSlider);
}

function closeHeadlinesSlider() {
  headlinesSliderOpen = false;
  var currentHeadlinesSlider = document.getElementById(openHeadlinesSliderName + "-slider");

  // move the slider so that it is off the screen. The number of pixels must be equal to or greater than what is set in the css
  currentHeadlinesSlider.style.right = "-350px";
  $("#" + openHeadlinesSliderName + "-slider-bg").removeClass("headlines-slider-backdrop");

  // remove the lock-scroll from the body and remove the slider shadow
  $("body").removeClass("lock-scroll");
  $(currentHeadlinesSlider).removeClass("right-side-slider-shadow");

  // reset the openHeadlinesSliderName
  openHeadlinesSliderName = "";
}

function enableNavSwipeClose(slider) {
  // create a new Hammer instance and apply to the current slider. On swipe, call the close nav slider function
  var touchSlider = new Hammer(slider);
  touchSlider.on("swipeleft", closeNavSlider);
}

function enableHeadlinesSwipeClose(slider) {
  // create a new Hammer instance and apply to the current slider. On swipe, call the close headlines slider function
  var touchSlider = new Hammer(slider);
  touchSlider.on("swiperight", closeHeadlinesSlider);
}

// ==============================================================================
// Sliders Event Listeners
// ==============================================================================

// listener - open nav slider
$(document).on("click", ".nav-icon", function() {
  navSliderOpen ? closeNavSlider() : openNavSlider();
});

// listener - close nav slider with click outside slider
$(".nav-slider-bg").mousedown(function(e) {
  var navSlider = document.getElementById("nav-slider");

  if (!$(e.target).is(navSlider)) {
    closeNavSlider();
  }
});

// listener - open headlines slider
$(document).on("click", ".headline-button", function() {
  // get the headline id
  var headlinesId = $(this).attr("data-id");

  // store the headlinesId as the open slider
  openHeadlinesSliderName = headlinesId;

  openHeadlinesSlider();
});

// listener - close headlines slider with click outside slider
$(".headlines-slider-bg").mousedown(function(e) {
  var currentHeadlinesSlider = document.getElementById(openHeadlinesSliderName + "-slider");

  if (!$(e.target).is(currentHeadlinesSlider)) {
    closeHeadlinesSlider();
  }
});

// listener - close slider with Esc key
$(document).keyup(function(e) {
  // determine if the key pressed was Esc
  if (e.keyCode === 27) {
    // if yes, then go through the slider priority and close the approriate slider
    if (navSliderOpen) {
      return closeNavSlider();
    } else if (bundleSliderOpen) {
      return closeBundleSlider();
    } else if (articleSliderOpen) {
      return closeArticleSlider();
    } else if (headlinesSliderOpen) {
      return closeHeadlinesSlider();
    }
  }
});