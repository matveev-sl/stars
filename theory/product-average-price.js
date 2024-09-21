const products = [
  { name: 'Product 1', price: 0, category: 'Electronics' },
  { name: 'Product 2', price: 80, category: 'Clothes' },
  { name: 'Product 3', price: 0, category: 'Electronics' },
  { name: 'Product 4', price: 80, category: 'Clothes' },
  { name: 'Product 5', price: 80, category: 'Clothes' },
  { name: 'Product 6', price: 0, category: 'Electronics' },
  { name: 'Product 7', price: 80, category: 'Clothes' },
  { name: 'Product 8', price: 0, category: 'Electronics' }
];

const averagePricePerCategory = Object.entries(
  products
    .reduce((acc, cur) => {
    // const currentPrices = acc[cur.category] ?? [];
      return {
        ...acc,
        [cur.category]: [ ...acc[cur.category] ?? [], cur.price ]
      };}, {}))
  .map(([ category, prices ]) => ({
    [category]: prices.reduce((acc, cur) => acc + cur, 0) / prices.length
  }));

console.log(averagePricePerCategory);
