export const orders = JSON.parse(localStorage.getItem("orders")) || []; // If there's nothing in localStorage, use empty array as default value

export function addOrder(order) {
  orders.unshift(order); // Adds order to the front of the array (so it appears at the top of the list) rather than the back
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
