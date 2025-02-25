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
import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js"; // '..' means to go up one level in the directory structure
import { formatCurrency } from "./utils/money.js"; // '.' means to stay in the same directory

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

  // Note: when using radio buttons, we need to give each set of radio buttons a unique name
  // Any radio buttons that share the same name will be part of the same group, and only one radio button in the group can be selected at a time
  cartSummaryHTML += `
  <div class="cart-item-container">
            <div class="delivery-date">Delivery date: Tuesday, June 21</div>

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
                <div class="delivery-option">
                  <input
                    type="radio"
                    checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Tuesday, June 21</div>
                    <div class="delivery-option-price">FREE Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Wednesday, June 15</div>
                    <div class="delivery-option-price">$4.99 - Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Monday, June 13</div>
                    <div class="delivery-option-price">$9.99 - Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `;
});

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
    console.log(cart);

    // Step 2: Update the HTML to remove the product from the checkout page
  });
});
