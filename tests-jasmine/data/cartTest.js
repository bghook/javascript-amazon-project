import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

// Create a new test suite in Jasmine by using describe()
describe("Test Suite: addToCart", () => {
  // A best practice in testing is to test each condition of an if-statement
  // This is known as "Test Coverage" - how much of the code is being tested
  // We try to maximize test coverage

  // Test 1: When the product is already in the cart
  it("Adds an existing product to the cart", () => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();

    // addToCart() doesn't return a value, so we can't really compare it to another value using expect()
    // Instead, we'll call addToCart to modify the cart, then check if the cart has been modified correctly
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6"); // Just grabbed the first product ID from the products.js file to pass in to addToCart() and add it to the cart
    // Use expect() to compare cart size to expected size of 1 (we just added 1 item)
    expect(cart.length).toEqual(1);

    // Check if the localStorage.setItem() method was called once
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
  });

  // Test 2: When the product is not in the cart
  it("Adds a new product to the cart", () => {
    /**************************************
     * MOCKS
     **************************************/
    // Recall that we're saving our cart in local storage
    // This can lead to a "flaky test" - a test that passes sometimes and fails other times, in this case based on whether or not the cart is empty
    // To deal with this problem, we'll utilize MOCKS - a mock is a fake object that we can use to simulate the behavior of a real object
    // To use mocks in Jasmine, we'll use the spyOn() function to mock the localStorage object
    // spyOn() takes 2 arguments: the object to be mocked and the method to be mocked
    spyOn(localStorage, "setItem");

    // The code below mocks the getItem() method of the localStorage object and makes our fake getItem() method return an empty array
    // This way, we can test the addToCart() function without worrying about the cart being empty or not
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    // Now that we've mocked the getItem() method, we can call loadFromStorage() to load the cart from local storage
    // loadFromStorage() will use the mocked getItem() method to get an empty array
    // However, loadFromStorage() will also set the cart to a default value if the cart is empty
    // So we'll need to mock the setItem() method of the localStorage object as well
    loadFromStorage(); // Load the cart from local storage after mocking, so that cart is empty

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6"); // Just grabbed the first product ID from the products.js file to pass in to addToCart() and add it to the cart
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
  });
});
