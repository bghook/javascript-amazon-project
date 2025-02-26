/**************************************
 * checkout.js
 * This script loops through the cart and generates the HTML for the cart items
 * It then sets the innerHTML of the .js-order-summary element to the generated HTML
 **************************************/
/* Main idea of JavaScript
  1. Save the data
  2. Generate the HTML
  3. Make it interactive
*/
import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js"; // '..' means to go up one level in the directory structure
import { formatCurrency } from "./utils/money.js"; // '.' means to stay in the same directory
// An external library is simply code that is outside our project
// External libraries allow us to share code and avoid unnecessary work (reinventing the wheel)
// Rather than being imported from another file in the project, external libraries are imported from the internet
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
// Notice the new syntax below - no curly braces around dayjs
// This is because dayjs is the default export of the library
// Default exports are imported without curly braces, and they're used when we only want to export one thing
// Each file can only have 1 default export
// The syntax using curly braces for imports is called a 'named export'
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

hello();

const today = dayjs();
const deliveryDate = today.add(7, "days");
// The format below specifies the full name of the day of the week, full name of month, and the day of the month as a number
// More details can be found in the DayJS documentation
deliveryDate.format("dddd, MMMM D");

// Each time we loop through the cart, we'll add the HTML here so we combine it all together
let cartSummaryHTML = "";

// Loop through the cart and generate the HTML
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  // Search for the matching product in the products array
  // Once we find the matching product, we'll have access to the product's name, price, and image - we can use this information to generate the HTML for the cart item
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;

  // Search for the matching delivery option in the deliveryOptions array
  // Once we find the matching delivery option, we can use it to get the deliveryDays property and calculate the delivery date that we need to display on the checkout page
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  // Take the deliveryOption that we found above and use it to format the delivery date which we'll insert into the HTML
  // Combined with the code above, this will display the correct delivery date for each item in the cart based on which delivery option is selected (in green letters above product image)
  const today = dayjs();
  // 2 parameters for the add() method: the number of days to add (stored in our deliveryOptions file), and the unit of time (days, months, years, etc.)
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");

  // Note: when using radio buttons, we need to give each set of radio buttons a unique name
  // Any radio buttons that share the same name will be part of the same group, and only one radio button in the group can be selected at a time
  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
          <div class="delivery-date">Delivery date: ${dateString}</div>

          <div class="cart-item-details-grid">
            <img
              class="product-image"
              src="${matchingProduct.image}"
            />

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">$${formatCurrency(
                matchingProduct.priceCents
              )}</div>
              <div class="product-quantity">
                <span> Quantity: <span class="quantity-label">${
                  cartItem.quantity
                }</span> </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                  matchingProduct.id
                }">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
          </div>
        </div>
  `;
});

// Step 1: Loop through deliveryOptions
// Step 2: For each option, generate some HTML
// Step 3: Combine the HTML together
function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = "";

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    // 2 parameters for the add() method: the number of days to add (stored in our deliveryOptions file), and the unit of time (days, months, years, etc.)
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    // Using a ternary operator to check if the price is 0 - if it is, we'll display "FREE" instead of the price
    const priceString =
      deliveryOption.priceCents === 0
        ? "FREE"
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

    // We want the radio button to be checked if the delivery option is the one selected in the cart
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
  <div class="delivery-option js-delivery-option" 
  data-product-id="${matchingProduct.id}" 
  data-delivery-option-id="${deliveryOption.id}">
    <input
      type="radio"
      ${isChecked ? "checked" : ""}
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}"
    />
    <div>
      <div class="delivery-option-date">${dateString}</div>
      <div class="delivery-option-price">${priceString} - Shipping</div>
    </div>
  </div>
  `;
  });

  return html;
}

// Use the DOM to put the combined HTML on the page
document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

// Use the DOM to add event listeners to the delete links
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    // Step 1: Remove product from cart
    //  - In order to remove a product from the cart, we need to know the product ID
    //  - We can get the product ID from the data-product-id attribute on the delete link
    const productId = link.dataset.productId;
    removeFromCart(productId);

    // Step 2: Update the HTML to remove the product from the checkout page
    // To do this, we'll first need to add a special class to the cart item container so we can easily find and remove it
    // We'll then use the DOM to find the cart item container and remove it using the remove() method
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove(); // This will take the cart item that we grabbed using the DOM above and remove it from the page
  });
});

// Add event listeners to each radio button - when they're clicked, update the delivery date displayed on the checkout page
document.querySelectorAll(".js-delivery-option").forEach((element) => {
  element.addEventListener("click", () => {
    // Step 1: Update deliveryOptionId in the cart
    // In order to use the updateDeliveryOption function, we need to pass in the productId and deliveryOptionId
    // We can get both of these parameters by adding data attributes to the delivery option container - one for the product ID and one for the delivery option ID
    const { productId, deliveryOptionId } = element.dataset;
    // Above is a Shorthand Property - it does the same thing as the longhand version below
    // const productId = element.dataset.productId;
    // const deliveryOptionId = element.dataset.deliveryOptionId;

    updateDeliveryOption(productId, deliveryOptionId);

    // Step 2: Update the page
  });
});
