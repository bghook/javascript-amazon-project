/**************************************
 * money.js
 * This file contains utility functions for working with money
 **************************************/
export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
}
