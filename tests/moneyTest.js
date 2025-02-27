/**************************************
 * moneyTest.js
 * Automated tests for the money.js module
 **************************************/
import { formatCurrency } from "../scripts/utils/money.js";

/**************************************
 * AUTOMATED TESTING
 **************************************/
// In JavaScript, there are 2 main types of testing
// 1. Manual testing - you run the code and see if it works, i.e. checking the website in the browser
//    - Manual testing has some disadvantages, as it is hard to test every single case and it's difficult to re-test
// 2. Automated testing - you write CODE to test the code, i.e. writing test cases
//
// Generally, we create 2 types of test cases:
//    1. Basic test cases - test if the code is working
//    2. Edge cases - test if the code is working in extreme/tricky cases
//
// Best practice dictates grouping related test cases together
// A group of related tests is called a test suite

/**************************************
 * TESTING FRAMEWORKS
 **************************************/
// A testing framework is a library that helps you write test cases
// We have 3 main goals for automated testing, and a testing framework helps us accomplish all 3:
//  1. Create test suite
//  2. Create tests
//  3. Compare values and display result
// For this project, we'll use Jasmine, a popular testing framework
// Jasmine is a behavior-driven development framework for testing JavaScript code

console.log("Test Suite: formatCurrency");

// Basic test case
console.log("Converts cents into dollars:");
if (formatCurrency(2095) === "20.95") {
  console.log("Passed");
} else {
  console.log("Failed");
}

// Edge cases
console.log("Works with 0:");
if (formatCurrency(0) === "0.00") {
  console.log("Passed");
} else {
  console.log("Failed");
}

console.log("Rounds up to nearest cent:");
if (formatCurrency(2000.5) === "20.01") {
  console.log("Passed");
} else {
  console.log("Failed");
}
