/* Main idea of JavaScript
  1. Save the data
  2. Generate the HTML
  3. Make it interactive
*/

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
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">${(product.priceCents / 100).toFixed(
            2
          )}</div>

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

          <button class="add-to-cart-button button-primary">Add to Cart</button>
        </div>`;

  console.log(productsHTML);
});

/**************************************
 * Step 3: Make it interactive
 **************************************/
// In this step, we'll use the DOM to put the combined HTML on the page
// Note that the webpage won't look any different than it did before (when the HTML was in our html file) - the difference is that we're using JavaScript to generate the HTML
// This is useful because it allows us to generate HTML dynamically based on data, rather than having to write out all the HTML ourselves
// This is especially useful when we have a lot of data to display, or when the data changes frequently
document.querySelector(".js-products-grid").innerHTML = productsHTML;
