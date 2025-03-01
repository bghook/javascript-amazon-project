import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/cart-class.js"; // This is another syntax we can use for importing modules - it runs the code in the cart-oop.js file without importing anything
// import "../data/backend-practice.js";

/**************************************
 * ASYNC/AWAIT
 **************************************/
// Async/await is a newer way to write asynchronous code in JavaScript and is built on top of promises
//  - Async/await can ONLY be used with promises - it doesn't do anything with a callback
// Async/await makes our code easier to read and write - it's a shortcut for writing promises
// Async/await is considered best practice to use over promises and callbacks
// The async keyword makes a function return a promise
// The reason we use async is because it allows us to use the second feature: await
// The await keyword makes JavaScript wait for a promise to finish before going to the next line
//  - await lets us write asynchronous code like normal (synchronous) code
//  - We don't have to bother with any more .then() - we can just write it like normal code
// IMPORTANT NOTE: We can only use await INSIDE an async function!
/**************************************
 * ASYNC/AWAIT - ERROR HANDLING
 **************************************/
// Error handling with async/await: we can use try/catch blocks to handle errors
// IMPORTANT NOTE: As soon as we get an error, it will skip the rest of the code and go straight to the catch block
// Why don't we just use try/catch blocks everywhere?
//  - Try/catch is meant to handle unexpected errors (i.e. the code is correct but something outside of our control went wrong)
// We can also manually create errors using the throw keyword
//  - This is useful for when we want to stop the code from running and handle the error ourselves

// 3 steps for this loadPage() function:
//  1. Load the products
//  2. Load the cart
//  3. Render the page
async function loadPage() {
  try {
    // throw "Error 1"; // This will skip the rest of the code and go straight to the catch block, saving the value "Error 1" in the error variable

    await loadProductsFetch(); // The await keyword will wait for this line to finish and get the response from the backend before moving to the next line

    // Load the cart with a promise
    // We want this line to finish before moving to the next line, so we use await
    await new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  } catch (error) {
    console.log("Unexpected error. Please try again later.");
  }

  renderOrderSummary();
  renderPaymentSummary();

  // Another thing to note about await - if resolve is called with a value, that value will be returned by the await line itself rather than in the next .then() function as with promises
  // This makes our code easier to read and write
  // Example below:
  // const value = await new Promise(() => {
  //   loadCart(() => {
  //     resolve("value3");
  //   })
  // })
  // console.log(value); // This will log "value3"
}
// Because loadPage is an async function, it returns a promise - we could use .then() directly on loadPage() to run code after the promise has resolved if we wanted
loadPage();

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
// Promise.all([
//   // loadProductsFetch returns a promise, so all we need to do is include the function in the array
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   }),
// ]).then((values) => {
//   console.log(values); // This will log ["value1", undefined] (can pass data between promises this way)
//   // After loading the products and cart, the third step is to render the page (order summary and payment summary)
//   // This function will run after the second promise has resolved
//   renderOrderSummary();
//   renderPaymentSummary();
// });

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
