import { select, selectAll, create } from "./extras";
import { myArray } from "./data";
import { gsap, Power0, Power1 } from "gsap";

// Importing necessary functions and data from other files.
// Make sure you have the correct paths for "./extras" and "./data" files.

const imageData = myArray;
const elementPadding = 150;
const elementSize = 450;

// Initializing some constants for image data and sizes.

const keyCodes = {
  Left: 37,
  Right: 39,
};

// Keycodes for left and right arrow keys.

window.addEventListener("load", () => {
  // Adding a "load" event listener to the window. This ensures the code below will run after the whole page has loaded.
  // Code inside this block will execute after the window has loaded.
  // This ensures that the DOM elements are available for manipulation.

  const main = select("main");
  const ListGenerator = Generator();
  let initialValue = 0;
  let endValue = 90;
  let isAnimating = false;

  // Selecting the "main" element and initializing some variables.

  function Generator() {
    // Defining the Generator function responsible for creating and animating the images.

    const middle = Math.floor(imageData.length / 2);

    imageData.forEach((image, index) => {
      // Looping through each image in the imageData array.

      const picture = create("picture");
      picture.classList.add("picture");
      const img = create("img");
      img.src = image.img;

      picture.appendChild(img);
      main.appendChild(picture);
      // Creating and adding each image to the "main" element.

      const offset = index - middle;
      let scaleValue = 1;

      if (index === middle) {
        // Handling the middle image. Applying special properties for the middle image to give it focus.
        scaleValue = 1.6;
      } else {
        // For images before and after the middle image, reduce the scale slightly.
        scaleValue = 0.9;
        const distanceFromMiddle = Math.abs(offset);
        gsap.to(picture, {
          zIndex: 0,
          filter: "grayscale(100%) blur(4px)",
          x: -((elementSize + elementPadding) * distanceFromMiddle),
          y: (100 + elementPadding) * distanceFromMiddle,
        });
      }

      gsap.to(picture, {
        zIndex: index === middle ? 100 : 0,
        scale: scaleValue,
        filter:
          index === middle
            ? "grayscale(0%) blur(0px)"
            : "grayscale(100%) blur(4px)",
        x: (elementSize + elementPadding) * offset,
        y: 0,
      });
    });
  }

  // The Generator function is responsible for creating and animating the images based on the imageData array.

  // The progressNumber function calculates the loading percentage and updates the DOM accordingly.

  const animate = function (list, direction) {
    // Defining the animate function, responsible for animating the images when the user navigates using the arrow keys.

    isAnimating = true;
    list.forEach((pic, _, arr) => {
      let propX = gsap.getProperty(pic, "x");
      const translateValueX = elementSize + elementPadding;

      const midIndex = arr.findIndex((el) => gsap.getProperty(el, "x") === 0);

      const curr = list[midIndex];
      const next = list[direction === "left" ? midIndex + 1 : midIndex - 1];

      if (next == undefined || next == null) {
        isAnimating = false;
        return;
      }

      gsap.to(next, {
        scale: 0.9,
        duration: 1,
        zIndex: 100,
        ease: Power1.easeInOut,
      });

      gsap
        .to(curr, {
          scale: 0.8,
          filter: "grayscale(100%) blur(4px)",
          duration: 1,
          ease: Power1.easeInOut,
        })
        .then(() => {
          gsap.to(curr, {
            zIndex: 0,
            scale: 1,
            ease: Power1.easeInOut,
            duration: 1,
          });
          gsap
            .to(next, {
              scale: 1.6,
              duration: 1,
              filter: "grayscale(0%) blur(0px)",
              ease: Power1.easeIn,
            })
            .then(() => (isAnimating = false));
        });

      gsap.to(pic, {
        x:
          direction === "left"
            ? propX - translateValueX
            : propX + translateValueX,
        duration: 2,
        ease: Power1.easeInOut,
      });
    });
  };

  // The animate function handles the transition animation between images when the user presses the arrow keys.

  window.addEventListener("keydown", ({ keyCode }) => {
    const { Left, Right } = keyCodes;
    const list = selectAll(".picture");

    if (keyCode === Left && !isAnimating) {
      animate(list, "left");
    }
    if (keyCode === Right && !isAnimating) {
      animate(list, "right");
    }
  });
  // The event listener for the keydown event handles arrow key presses and initiates the animate function.

 window.addEventListener("wheel", (el) => {
   const list = selectAll(".picture");
   if (el.deltaY < 0 && !isAnimating) {
     animate(list, "left");
   }
   if (el.deltaY > 0 && !isAnimating) {
     animate(list, "right");
   }
 });

 window.addEventListener("touchstart", (e) => {
   // Save the initial touch position
   const touchStartY = e.touches[0].clientY;
 });

 window.addEventListener("touchmove", (e) => {
   // Prevent the default scrolling behavior
   e.preventDefault();

   // Get the current touch position
   const touchCurrentY = e.touches[0].clientY;

   // Calculate the change in Y position
   const deltaY = touchCurrentY - touchStartY;

   // Use the deltaY value to determine the scrolling direction
   const list = selectAll(".picture");
   if (deltaY < 0 && !isAnimating) {
     // Scrolling up
     animate(list, "left");
   }
   if (deltaY > 0 && !isAnimating) {
     // Scrolling down
     animate(list, "right");
   }
 });

});




// //import { select, selectAll, create } from "./extras";
// import { myArray } from "./data";
// import { gsap, Power0, Power1 } from "gsap";

//     This section imports necessary functions and data from other files. The code imports select, selectAll, and create functions from a module named "./extras", myArray from a module named "./data", and GSAP library components gsap, Power0, and Power1.

// const imageData = myArray;
// const elementPadding = 150;
// const elementSize = 450;

//     Here, we define some constants: imageData is initialized with the value of myArray, elementPadding is set to 150, and elementSize is set to 450.

// const keyCodes = {
//   Left: 37,
//   Right: 39,
// };

//     An object keyCodes is created, which maps the left arrow key's keycode (37) to the property "Left" and the right arrow key's keycode (39) to the property "Right". This will be used later to handle key presses.

// window.addEventListener("load", () => {
//   // Code inside this block will execute after the window has loaded.
//   // This ensures that the DOM elements are available for manipulation.

//   const main = select("main");
//   const ListGenerator = Generator();
//   let initialValue = 0;
//   let endValue = 90;
//   let isAnimating = false;

//     main is set to reference the DOM element with the "main" tag using the select function imported from the "./extras" module.
//     ListGenerator is assigned the return value of the Generator function, which will be explained later.
//     initialValue, endValue, and isAnimating are initialized with their respective values.

//     The Generator() function is defined, which iterates through each image object in the imageData array.
//     For each image, it creates a new DOM element for the picture, adds the "picture" class to it, and appends an image element with the src attribute set to the image URL.
//     It then appends the picture to the "main" element on the page.
//     It calculates the middle index of the imageData array and initializes a variable count to 0.
//     If the current index is the middle index, GSAP is used to apply special animation properties (e.g., scale, filter, position) to the image to give it focus.
//     If the current index is less than the middle index, GSAP is used to apply animation properties to images before the middle image, like a left-to-right sliding effect with grayscale and blur transformations.
//     If the current index is greater than the middle index, GSAP is used to apply animation properties to images after the middle image, like a right-to-left sliding effect with grayscale and blur transformations.

//     The progressNumber function is defined to handle loading progress and updates the loading percentage on the screen.
//     Inside this function, there is an inner function start, which calculates the speed of the progress update based on the loading parameter.
//     If loading is false, the progress update will be faster.
//     The function increments initialValue to update the loading percentage and sets the content of the element with class "loading" to the updated percentage.
//     If the loading percentage reaches 99, the element with class "loading" will be hidden (opacity set to 0) using GSAP.

//     The animate function is responsible for animating the images when the user navigates using the arrow keys.
// It sets isAnimating to true at the beginning to indicate that an animation is in progress.
// The function uses a loop to iterate through each image in the list array, which contains all the images.
// It calculates the propX and propY values (current position) of the current image using the GSAP getProperty method.
// It sets translateValueX and translateValueY, which represent the amount to slide the image horizontally and vertically.
// The function finds the midIndex, which is the index of the middle image in the array.
// It determines the curr and next images based on the direction parameter and the midIndex.
// If there is no next image (e.g., if the user reaches the last image in the specified direction), the animation is stopped, and isAnimating is set to false.
// It then animates the next image to have a scale of 0.9 and a higher zIndex, making it more prominent.
// The curr image is animated to have a scale of 0.8, grayscale, and a blur effect. Once this animation completes, it's set back to the original scale (1) and its zIndex is reset.
// After that, the next image is animated to have a larger scale (1.6) and no grayscale or blur effect.
// Finally, the pic (current) image is animated to slide to the specified direction based on the direction parameter using GSAP.

//    The code is looping through each image in the list of images one by one.

// It calculates the current position (propX and propY) of the current image using GSAP's getProperty method.

// It sets two variables, translateValueX and translateValueY, which represent how much the image will be moved horizontally and vertically during the animation.

// The code finds the midIndex, which is the index of the middle image in the list array. It does this by looking for an image with a propX value of 0, which indicates that the image is in the center.

// It determines the curr and next images based on the direction parameter and the midIndex. If the user wants to move "left," it selects the image to the right of the middle image (midIndex + 1). If the user wants to move "right," it selects the image to the left of the middle image (midIndex - 1).

// If there is no next image (e.g., if the user reaches the last image in the specified direction), the animation is stopped (isAnimating is set to false), and the function exits early using the return statement.

// If there is a valid next image, the function continues with the animation by applying different transformations to the current and next images to create a sliding effect.

// After the animation is complete, the variable isAnimating is set to false, indicating that the animation has finished.
