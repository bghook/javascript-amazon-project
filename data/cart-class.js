/**************************************
 * OBJECT ORIENTED PROGRAMMING (OOP) - CLASSES
 * In this file, we'll update cart.js to use classes rather than relying solely on functions to create objects
 **************************************/
// Similar to constructor functions, naming convention for classes is to use PascalCase
// Classes are a way to define objects in JavaScript - it is basically an object generator
// Classes are a more modern way to define objects in JavaScript

class Cart {
  // Note that classes have a different syntax than objects
  // Here we define properties in the traditional way, not with property:value pairs
  cartItems; // Note that cartItems does not have a # in front of it, so it is a public property - it can be accessed from outside the class

  /**************************************
   * PRIVATE PROPERTIES
   **************************************/
  // Private properties and methods are only accessible within the class
  // We made localStorageKey a property of the Cart class, and we made it private by adding a # in front of the property name
  #localStorageKey;

  // The constructor() method is a special method for creating and initializing an object created with a class
  // The constructor() method is called automatically when a new object is created
  // Parameters for the constructor method are passed in when we create a new object of the class
  // This is a great place to put our setup code
  // Note that the constructor should not return anything
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;

    // This function needs to run at least once when we load this file
    this.#loadFromStorage();
  }

  /**************************************
   * PRIVATE METHODS
   **************************************/
  // Similar to private properties, private methods are only accessible within the class
  // We made loadFromStorage() a private method by adding a # in front of the method name
  #loadFromStorage() {
    // 'this' keyword gives us the object that contains the method (the "outer" object, in this case the cart object on line 6)
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    // If there's no cart in local storage (i.e. the cart is empty), we'll give the cart a default value below
    if (!this.cartItems) {
      this.cartItems = [
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

  saveToStorage() {
    // setItem() method stores the data in the local storage
    // Remember that local storage can only store strings! So we need to convert our cart array to a string using JSON.stringify()
    // setItem() takes 2 strings: the name of whatever we want to save, and the data that we want to save
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;
    // We'll also perform a check for quantity - if the product is already in the cart, we'll increase the quantity by 1; else, we'll add the product to the cart
    // The item parameter below will contain a product name and quantity
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      // To add the product to the cart, we'll use an object because we want 2 pieces of information: the product name and the quantity
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: "1", // New products added to cart will select delivery option 1 by default
      });
    }

    // Note: since we moved the saveToStorage() method inside the cart object, we need to call it using the 'this' keyword
    this.saveToStorage();
  }

  removeFromCart(productId) {
    // One way to approach this function is to create a new cart array, loop through the existing cart array, and if current product is not the one we want to remove, add it to the new cart array
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();

    // An alternative way to approach this function is to use the filter method
    // The filter method creates a new array with all elements that pass the test implemented by the provided function
    // cart = cart.filter((cartItem) => {
    //   return cartItem.productId !== productId;
    // });
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    // When we update a delivery option, we need to know:
    //  1. The product we want to update (the product ID)
    //  2. The delivery option that was chosen (the delivery option ID)

    // First, we'll loop through the cart and find the product
    // We already had code that accomplishes this written in the addToCart function, so we'll reuse that code here
    // The code below will find the product in the cart that matches the productId and save it in the matchingItem variable
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    // Second, we'll update the deliveryOptionId of that product
    matchingItem.deliveryOptionId = deliveryOptionId;

    // Since we updated the cart, we need to save it to local storage
    this.saveToStorage();
  }
}

// This generates a new object of the Cart class
// The Cart object will have all the properties and methods defined in the Cart class
const cart = new Cart("cart-oop");
const businessCart = new Cart("cart-business");

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart); // Checks if businessCart is an instance of the Cart class - Output: true
