import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/cart-class.js"; // This is another syntax we can use for importing modules - it runs the code in the cart-oop.js file without importing anything
// import "../data/backend-practice.js";

/**************************************
 * PROMISES
 **************************************/
// A promise is an object that represents the eventual completion (or failure) of an asynchronous operation
// It's similar to the done() function in Jasmine - we can use it to run code after an asynchronous operation has completed
// A promise creates a separate thread of execution
// Why use promises? Why not just use callbacks?
//  - Promises make our code easier to read and write, as multiple callbacks cause a lot of nesting

// When we create a promise, we need to give it a function
// When we create the promise, the function we give it will run immediately
// The function we give the promise takes a parameter called 'resolve'
//  - resolve is a function, similar to done() in Jasmine, which lets us control when to go to the next step
// So we run some asynchronous code, wait for it to finish, then call resolve() to go to the next step
// To add the next step after a promise, we use the .then() method
//  - .then() takes a function as a parameter, which will run after the promise has resolved
// Note that .then() can return a new promise! This allows us to chain promises together
//  - Inside .then(), if we want to use resolve to wait for some code to finish, we can return a new promise
// We can also give a parameter to resolve() - this parameter will be passed to the next .then() function
//  - This is how we can pass data between promises

// new Promise((resolve) => {
//   // Lets add some asynchronous code here, such as the loadProducts function
//   // We can then call resolve() when the asynchronous code has completed
//   loadProducts(() => {
//     // This callback function will run after loadProducts has completed
//     resolve("value1"); // This tells the promise that the asynchronous operation has completed
//   });
// })

//   .then((value) => {
//     console.log(value); // This will log "value1" (can pass data between promises this way)

//     // This function will run after the promise has resolved
//     return new Promise((resolve) => {
//       loadCart(() => {
//         resolve();
//       });
//     });
//   })

//   .then(() => {
//     // After loading the products and cart, the third step is to render the page (order summary and payment summary)
//     // This function will run after the second promise has resolved
//     renderOrderSummary();
//     renderPaymentSummary();
//   });

// Promise.all()
//  - Lets us run multiple promises at the same time and wait for ALL of them to finish
// Stores multiple promises in an array and waits for all of them to resolve
Promise.all([
  new Promise((resolve) => {
    // Lets add some asynchronous code here, such as the loadProducts function
    // We can then call resolve() when the asynchronous code has completed
    loadProducts(() => {
      // This callback function will run after loadProducts has completed
      resolve("value1"); // This tells the promise that the asynchronous operation has completed
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then((values) => {
  console.log(values); // This will log ["value1", undefined] (can pass data between promises this way)
  // After loading the products and cart, the third step is to render the page (order summary and payment summary)
  // This function will run after the second promise has resolved
  renderOrderSummary();
  renderPaymentSummary();
});

/**************************************
 * USING THE BACKEND IN OUR PROJECT
 **************************************/
// Here, we're passing an ANONYMOUS FUNCTION (a function without a name) as a CALLBACK FUNCTION to the loadProducts function
// This anonymous function will run AFTER the products have been loaded by the loadProducts function
// This is a common pattern in JavaScript - we use callback functions to run code after an asynchronous operation has completed
// This is how we use a backend in our project: we send a request to the backend, then use a callback function to run the rest of our code after the backend has responded
// loadProducts(() => {
//   // This function runs after the products have been loaded
//   // We can now render the order summary and payment summary
//   renderOrderSummary();
//   renderPaymentSummary();
// });

/**************************************
 * NESTED CALLBACKS EXAMPLE (WHY PROMISES ARE BETTER)
 **************************************/
// Below is an example of how, as we add more and more callbacks, our code becomes more and more nested and thus harder to read
// Promises allow us to "flatten" our code

// loadProducts(() => {
//   // The function below will run after the products have been loaded
//   // We can now load the cart
//   loadCart(() => {
//     // The functions below will run after the cart has been loaded
//     // We can now render the order summary and payment summary
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// });
