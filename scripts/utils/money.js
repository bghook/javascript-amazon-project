/**************************************
 * money.js
 * This file contains utility functions for working with money
 **************************************/
export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2); // We just add the Math.round at the beginning to deal with a tricky accuracy rounding issue of toFixed() function
}

// Make formatCurrency the default export of this module
// This allows us to import formatCurrency in other files without using curly braces
export default formatCurrency;
