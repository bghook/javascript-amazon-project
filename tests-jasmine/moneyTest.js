import { formatCurrency } from "../scripts/utils/money.js";

// To create a test suite in Jasmine, we'll use the describe() function
// Note that in Jasmine, tests are called "specs"
// To name a test suite, we'll pass a string as the first argument to describe()
// The second argument is a function that contains the test cases
// Note that we can use describe() inside another describe() to create nested test suites
// This is useful for organizing our test cases
describe("Test Suite: formatCurrency", () => {
  // Here, we'll create out test cases
  // To create a test case in Jasmine, we'll use the it() function
  it("Converts cents into dollars", () => {
    // This is the code inside the first test case
    // Rather than create an if statement to compare the values, Jasmine provides a function to do this
    // The function is called expect() - it lets us compare a value to an expected value
    // expect() takes the value to be tested as its first argument
    // The second argument is a function that compares the two values
    // The function is called toEqual() - it checks if the two values are equal and displays the result
    // If the values are equal, the test passes
    // expect() gives us an object that has a method called toEqual(), so we use dot notation to call it
    expect(formatCurrency(2095)).toEqual("20.95");
  });

  it("Works with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });

  it("Rounds up to the nearest cent", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
});
