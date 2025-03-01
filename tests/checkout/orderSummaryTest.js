import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart, resetCart } from "../../data/cart.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";

// renderOrderSummary updates the checkout page
// So there are 2 things we'll want to test:
//  1. How the page looks
//  2. How the page behaves
describe("Test Suite: renderOrderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  /**************************************
   * HOOKS
   **************************************/
  // A hook lets us run some code for each test
  // We can share code between tests by putting it in a hook
  // The beforeEach() hook runs before each test
  // This provides a way to share setup code between tests and reduce duplication
  // In this case, we'll use beforeEach() to set up the HTML for each test

  /**************************************
   * TESTING WITH A BACKEND
   **************************************/
  // done is a function provided by Jasmine
  // When we add it as a parameter to the beforeAll hook, Jasmine will wait for done() to be called before continuing the tests
  beforeAll((done) => {
    // Load products before all tests
    loadProductsFetch().then(() => {
      done();
    });
  });

  beforeEach(() => {
    spyOn(localStorage, "setItem");

    document.querySelector(".js-test-container").innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();

    renderOrderSummary();
  });

  // // Cleanup after each test (this runs even if tests fail)
  // afterEach(() => {
  //   try {
  //     // Clean up the DOM
  //     const testContainer = document.querySelector(".js-test-container");
  //     if (testContainer) {
  //       testContainer.innerHTML = "";
  //     }

  //     // Reset cart state
  //     resetCart();
  //   } catch (error) {
  //     console.error("Cleanup error:", error);
  //   }
  // });

  it("Displays the cart", () => {
    // Use DOM to check if correct number of items are displayed
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );

    // Use the toContain() method to check if the text in the HTML contains the correct quantity
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");

    // Remove the HTML we added to the test container earlier
    document.querySelector(".js-test-container").innerHTML = "";
  });

  // Test the delete link
  it("Removes a product", () => {
    // Use DOM to select the delete link for item with productId1 and simulate a click on it
    document.querySelector(`.js-delete-link-${productId1}`).click();
    // Use DOM to check if correct number of items are displayed
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    // Check if cart is correct length
    expect(cart.length).toEqual(1);
    // Check if cart contains correct product
    expect(cart[0].productId).toEqual(productId2);

    // Remove the HTML we added to the test container earlier
    document.querySelector(".js-test-container").innerHTML = "";
  });
});
