// src/services/products/data.js
let products = [
    { id: "1", name: "Smart TV", price: 100.5, categoryId: "1" },
    { id: "2", name: "Media Player", price: 200.0, categoryId: "1" },
    { id: "3", name: "Shelving", price: 50.0, categoryId: "2" },
    { id: "4", name: "Chair", price: 300.66, categoryId: "2" },
    { id: "5", name: "Fruit Punch Recipe", price: 180.11, categoryId: "3" },
    { id: "6", name: "Virgin Pinia", price: 250.0, categoryId: "3" },
    { id: "7", name: "Flopsy Bunny", price: 300.66, categoryId: "4" },
  ];
  
  const getProducts = ({ search, minPrice, maxPrice, categoryId, role }) => {
    return products
      .map((product) => ({
        ...product,
        price: role === "user" ? Math.round(product.price) : product.price,
      }))
      .filter((product) => {
        const matchesSearch =
          !search || product.name.toLowerCase().includes(search.toLowerCase());
        const matchesMinPrice = minPrice === null || product.price >= minPrice;
        const matchesMaxPrice = maxPrice === null || product.price <= maxPrice;
        const matchesCategory = categoryId === null || product.categoryId === categoryId;
        return (
          matchesSearch &&
          matchesMinPrice &&
          matchesMaxPrice &&
          matchesCategory
        );
      });
  };
  
  const updateProductName = (id, name) => {
    const product = products.find((p) => p.id === id);
    if (!product) throw new Error("Product not found");
    product.name = name;
    return product;
  };
  
  module.exports = { getProducts, updateProductName };
  