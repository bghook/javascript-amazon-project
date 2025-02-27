/**************************************
 * OBJECT ORIENTED PROGRAMMING (OOP)
 * In this file, we'll update cart.js to use OOP
 **************************************/
// To convert this code into OOP, we'll group all the data and functions together into an object

// Here we define a function for creating new cart objects
// This is a constructor function - it creates new objects
// We can use this function rather than having to copy and paste the code for each new cart object
// In OOP, the naming convention is to use PascalCase for things that generate objects
// Parameter: localStorageKey - the name of the key in local storage where the cart will be saved (e.g. "cart" or "businessCart")
function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
    // Recall that a function inside an object is called a METHOD

    loadFromStorage: function () {
      // 'this' keyword gives us the object that contains the method (the "outer" object, in this case the cart object on line 6)
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

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
    },

    // Note here we're using the shorthand syntax for defining a method
    // This is equivalent to writing saveToStorage: function() {} as we did for loadFromStorage() above
    saveToStorage() {
      // setItem() method stores the data in the local storage
      // Remember that local storage can only store strings! So we need to convert our cart array to a string using JSON.stringify()
      // setItem() takes 2 strings: the name of whatever we want to save, and the data that we want to save
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

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
    },

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
    },

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
    },
  };

  return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("cart-business");

// This function needs to run at least once when we load this file
// Since we moved it into the cart object, we need to call it as a method of cart using dot notation
cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
