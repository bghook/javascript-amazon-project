import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

/* As always, we'll do our 3 steps:
  1. Save the data (Model) - in this case, we'll need to calculate the cost of the items, shipping, and tax
  2. Generate the HTML
  3. Make it interactive
*/
export function renderPaymentSummary() {
  /**************************************
   * MODEL (MVC) - SAVE THE DATA
   **************************************/
  // To compute the total price of the items, we need to loop through the cart and multiply price * quantity for each item
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    // Next, we need to calculate the shipping cost
    // We can do this by looping through the cart and adding all the shipping costs together
    // We can get shipping information for each product by using the deliveryOptionId property of the cart item
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  // Total before tax
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  // Amount of tax
  const taxCents = totalBeforeTaxCents * 0.1;
  // Total after tax
  const totalCents = totalBeforeTaxCents + taxCents;

  /**************************************
   * VIEW (MVC) - GENERATE THE HTML
   **************************************/
  // Create a variable to store the HTML using template string
  // We'll use the amounts we calculated above and insert them into the HTML string
  const paymentSummaryHTML = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">
        $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary
      js-place-order">
      Place your order
    </button>
  `;

  // Now that we've generated our HTML above, we can insert it into the webpage using the DOM
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  // Use the DOM to get the "Place your order" button and add an event listener to it
  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        // When we click this button, we want to make a request to the backend to create the order - we'll use fetch for this
        // This time, we also need to send some data to the backend (the cart) in order to create our order
        // To SEND data in a request, we need to use a different TYPE OF REQUEST
        //  1. GET - we wan to get something from the backend
        //  2. POST - we want to send something to the backend, i.e. we want to create something
        //  3. PUT - we want to update something on the backend
        //  4. DELETE - we want to delete something from the backend
        // Using await here tells JavaScript to wait for the fetch to finish (i.e. to get a response from the backend) before continuing to the next line
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST", // We're sending data to the backend, so we use the POST method
          headers: {
            "Content-Type": "application/json", // Tell the backend what type of data we're sending in our request
          }, // headers property gives the backend more information about our request - it's needed when we send data to the backend
          body: JSON.stringify({
            // We can't send an object directly in our request, so we need to convert it to a JSON string using JSON.stringify
            cart: cart, // Send the cart array to the backend
          }),
        });

        // Recall that response.json() is ALSO a promise, so we'll use await to wait for it to finish
        // This will give us the data that the backend sent back to us, which should be the order that was created by the backend
        const order = await response.json();
        addOrder(order);
      } catch (error) {
        console.log("Unexpected error. Try again later.");
      }

      // After creating the order, we want to redirect the user to the order page
      // window.location is a special object provided by JavaScript - it lets us control the URL at the top of the browser
      // We can use window.location to redirect the user to a different page
      window.location.href = "orders.html"; // Replaces everything after the "[domain-name]/" with "orders.html" (note that "orders.html" is a filepath - make sure to include the full path if it's in a different folder)
    });
}
