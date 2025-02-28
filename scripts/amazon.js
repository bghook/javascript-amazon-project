/* Main idea of JavaScript
  1. Save the data
  2. Generate the HTML
  3. Make it interactive
*/

// Modules - import the cart array from the data/cart.js file
// Note: the type="module" attribute in the script tag in the HTML file allows us to use the import and export keywords
// Note: imports must go at the top of the file
// Note: 'import * as moduleName' allows us to import all the variables and methods from a file and access them using the moduleName.variableName or moduleName.methodName syntax
import { cart, addToCart } from "../data/cart.js"; // Reminder that '..' means to go up one level in the directory structure
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

/**************************************
 * Step 1: Save the data from HTML
 **************************************/
// Use an object to represent each product - an object lets us group multiple values together (like a product's name, price, and image)
// Note: make sure all the objects in the array have the same structure (same properties) - this allows our code to handle each object in the same way

// Declare a variable for combining HTML for products together outside of the loop
let productsHTML = "";

/**************************************
 * Step 2: Generate the HTML
 **************************************/
// To generate the HTML, we can loop through the products array and create a string of HTML for each product
// We can then insert this HTML into the page
// KEY POINT: The benefit of generating the HTML this way is that, if we want to add a new product, all we have to do is add it to the products array - the HTML will be generated automatically
// This is much easier than having to manually add the HTML for each product to the page
products.forEach((product) => {
  // Inside the template string below, we're basically going to copy all the HTML for each product
  // Notice the use of double dot notation to access the stars property of the rating object, which is a property of the product object (product.rating.stars)
  // Also for product.rating.stars, note that we multiply by 10 to get the correct image file name (since the image file names are rating-45.png, rating-40.png, etc.)
  // We also divide the price by 100 to convert it from cents to dollars (100 cents in each dollar)
  // Combine HTML together below using the Accumulator Pattern
  productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src=${product.image}
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="${product.getStarsUrl()}"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">Add to Cart</button>
        </div>`;
});

// Use the DOM to put the combined HTML on the page
// Note that the webpage won't look any different than it did before (when the HTML was in our html file) - the difference is that we're using JavaScript to generate the HTML
// This is useful because it allows us to generate HTML dynamically based on data, rather than having to write out all the HTML ourselves
// This is especially useful when we have a lot of data to display, or when the data changes frequently
document.querySelector(".js-products-grid").innerHTML = productsHTML;

// This function is not moved to cart.js because it is specific to the Amazon page (updating the display of the cart quantity on the Amazon page)
function updateCartQuantity() {
  // Calculate the total size of the cart
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  // Using the DOM, get the cart quantity element and update the text to show the total size of the cart on the webpage
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

/**************************************
 * Step 3: Make it interactive
 **************************************/
// First, we can add an event listener to each "Add to Cart" button
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    // Here, we want a function that adds a product to the cart
    // To get the id of each product dynamically, we'll use the 'data-product-id' attribute we added to each button
    // Data attributes are just like other HTML attributes, but they're meant to store data and have their own syntax (data-attribute-name)
    // The purpose of a data attribute is that we can attach any information to an element (i.e. a product's id, name, image, etc.) and then access that information with JavaScript
    // We can access the data attributes attached to an element using the 'dataset' property
    const productId = button.dataset.productId; // Notice that the id gets converted from kebab-case to camelCase (data-product-id -> dataset.productId)

    // Add the selected product to the cart, passing in the product id
    addToCart(productId);

    // Update the cart quantity
    updateCartQuantity();
  });
});
