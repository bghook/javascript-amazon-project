/**************************************
 * money.js
 * This file contains utility functions for working with money
 **************************************/
export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
}

// Make formatCurrency the default export of this module
// This allows us to import formatCurrency in other files without using curly braces
export default formatCurrency;
