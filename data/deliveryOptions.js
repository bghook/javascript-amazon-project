// We make each delivery option an object because it contains multiple pieces of information (delivery option id, deliveryDays, price of shipping), and we store these objects in an array
export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  // Search for the matching delivery option in the deliveryOptions array above
  // Once we find the matching delivery option, we can use it to get the deliveryDays property and calculate the delivery date that we need to display on the checkout page
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  // Return delivery option or the default option (standard delivery) if none is found
  return deliveryOption || deliveryOptions[0];
}
