import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
// import "../data/cart-class.js"; // This is another syntax we can use for importing modules - it runs the code in the cart-oop.js file without importing anything
// import "../data/backend-practice.js";

/**************************************
 * USING THE BACKEND IN OUR PROJECT
 **************************************/
// Here, we're passing an ANONYMOUS FUNCTION (a function without a name) as a CALLBACK FUNCTION to the loadProducts function
// This anonymous function will run AFTER the products have been loaded by the loadProducts function
// This is a common pattern in JavaScript - we use callback functions to run code after an asynchronous operation has completed
// This is how we use a backend in our project: we send a request to the backend, then use a callback function to run the rest of our code after the backend has responded
loadProducts(() => {
  // This function runs after the products have been loaded
  // We can now render the order summary and payment summary
  renderOrderSummary();
  renderPaymentSummary();
});
