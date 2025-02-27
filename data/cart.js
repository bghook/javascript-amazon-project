/**************************************
 * MODULES
 **************************************/
/* How to Get a Variable Out of a File
  1. Add a type="module" attribute to the script tag in the HTML file
  2. Export - choose which variables can be accessed outside of the file
  3. Import - go to the file where you want to use the variable and import it
*/

/* Benefits of Modules
  - Helps avoid naming conflicts (can also use import { variableName as newName } syntax to rename imported variables, further avoiding conflicts)
  - Don't have to worry about the order of script tags in the HTML file
  - Keeps code organized (see line above)
  - Makes code easier to maintain
  - Makes code easier to reuse
*/

// Best practice in JavaScript is to group related code together - we moved the addToCart function to the cart.js file because it's related to the cart
export let cart;

// This function needs to run at least once when we load this file
loadFromStorage();

export function loadFromStorage() {
  // getItem() takes 1 string - the name of the data we want to retrieve, which in this case is the string representation of the cart array which was saved via saveToStorage()
  // However, remember that local storage can only store strings, so we need to convert the string back to an array using JSON.parse()
  cart = JSON.parse(localStorage.getItem("cart"));

  // If there's no cart in local storage (i.e. the cart is empty), we'll give the cart a default value below
  if (!cart) {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  }
}

function saveToStorage() {
  // setItem() method stores the data in the local storage
  // Remember that local storage can only store strings! So we need to convert our cart array to a string using JSON.stringify()
  // setItem() takes 2 strings: the name of whatever we want to save, and the data that we want to save
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;
  // We'll also perform a check for quantity - if the product is already in the cart, we'll increase the quantity by 1; else, we'll add the product to the cart
  // The item parameter below will contain a product name and quantity
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    // To add the product to the cart, we'll use an object because we want 2 pieces of information: the product name and the quantity
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: "1", // New products added to cart will select delivery option 1 by default
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  // One way to approach this function is to create a new cart array, loop through the existing cart array, and if current product is not the one we want to remove, add it to the new cart array
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();

  // An alternative way to approach this function is to use the filter method
  // The filter method creates a new array with all elements that pass the test implemented by the provided function
  // cart = cart.filter((cartItem) => {
  //   return cartItem.productId !== productId;
  // });
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  // When we update a delivery option, we need to know:
  //  1. The product we want to update (the product ID)
  //  2. The delivery option that was chosen (the delivery option ID)

  // First, we'll loop through the cart and find the product
  // We already had code that accomplishes this written in the addToCart function, so we'll reuse that code here
  // The code below will find the product in the cart that matches the productId and save it in the matchingItem variable
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  // Second, we'll update the deliveryOptionId of that product
  matchingItem.deliveryOptionId = deliveryOptionId;

  // Since we updated the cart, we need to save it to local storage
  saveToStorage();
}
