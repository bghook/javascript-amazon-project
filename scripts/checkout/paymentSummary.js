import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

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

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  // Now that we've generated our HTML above, we can insert it into the webpage using the DOM
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
