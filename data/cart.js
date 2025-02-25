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
export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

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
    });
  }
}
