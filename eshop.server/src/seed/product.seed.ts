import { DataSource } from 'typeorm';
import { Product } from '../entities/product.entity'; // adjust path as needed

export const seedProducts = async (dataSource: DataSource) => {
  const productRepository = dataSource.getRepository(Product);

  const categories = [
    'Consumer Electronics',
    'Home Improvement & Lights',
    'Jewelry & Watches',
    'Toys & Games',
    'Fashion & Apparel',
    'Beauty & Health',
    'Automobiles & Motorcycles',
    'Sports & Outdoors',
    'Computers & Office',
    'Home & Kitchen',
  ];

  const exampleProducts = {
    'Consumer Electronics': [
      'Smartphone',
      'Bluetooth Speaker',
      'Wireless Headphones',
      'Smartwatch',
      'Drone',
      'Tablet',
      'Portable Charger',
      'LED TV',
      'Digital Camera',
      'VR Headset',
    ],
    'Home Improvement & Lights': [
      'LED Bulb',
      'Smart Thermostat',
      'Power Drill',
      'Screwdriver Set',
      'Extension Cord',
      'Wall Lamp',
      'Ceiling Fan',
      'Motion Sensor',
      'Toolbox',
      'Multimeter',
    ],
    'Jewelry & Watches': [
      'Gold Ring',
      'Silver Necklace',
      'Diamond Earrings',
      'Bracelet',
      'Watch',
      'Pendant',
      'Cufflinks',
      'Anklet',
      'Brooch',
      'Luxury Watch',
    ],
    'Toys & Games': [
      'Puzzle',
      'RC Car',
      'Action Figure',
      'Board Game',
      'Lego Set',
      'Yo-yo',
      'Stuffed Animal',
      'Dollhouse',
      'Drone Toy',
      'Building Blocks',
    ],
    'Fashion & Apparel': [
      'T-Shirt',
      'Jeans',
      'Jacket',
      'Sneakers',
      'Dress',
      'Sweater',
      'Scarf',
      'Hat',
      'Blazer',
      'Skirt',
    ],
    'Beauty & Health': [
      'Lipstick',
      'Moisturizer',
      'Shampoo',
      'Face Cream',
      'Perfume',
      'Toothbrush',
      'Electric Razor',
      'Hair Dryer',
      'Sunscreen',
      'Makeup Kit',
    ],
    'Automobiles & Motorcycles': [
      'Car Cover',
      'Motor Oil',
      'Tire Inflator',
      'Helmet',
      'Car Vacuum',
      'Phone Mount',
      'Dash Cam',
      'Seat Cover',
      'Steering Wheel Cover',
      'Jump Starter',
    ],
    'Sports & Outdoors': [
      'Tent',
      'Backpack',
      'Running Shoes',
      'Fitness Tracker',
      'Yoga Mat',
      'Water Bottle',
      'Bike Helmet',
      'Camping Stove',
      'Hiking Boots',
      'Swimsuit',
    ],
    'Computers & Office': [
      'Laptop',
      'Mouse',
      'Keyboard',
      'Monitor',
      'Desk Lamp',
      'Office Chair',
      'USB Hub',
      'Webcam',
      'Printer',
      'Router',
    ],
    'Home & Kitchen': [
      'Blender',
      'Microwave',
      'Coffee Maker',
      'Cutlery Set',
      'Dish Rack',
      'Toaster',
      'Rice Cooker',
      'Cookware Set',
      'Water Filter',
      'Vacuum Cleaner',
    ],
  };

  let id = 1;
  const allProducts: Product[] = [];

  categories.forEach((category, index) => {
    const categoryId = index + 1;
    exampleProducts[category].forEach((productName) => {
      const product = new Product();
      product.id = id++;
      product.name = productName;
      product.description = `${productName} - high quality and affordable.`;
      product.imageUrl = `https://source.unsplash.com/featured/?${encodeURIComponent(productName)}`;
      product.price = parseFloat((Math.random() * 490 + 10).toFixed(2));
      product.categoryId = categoryId;
      allProducts.push(product);
    });
  });

  await productRepository.save(allProducts);
  console.log(`✅ Seeded ${allProducts.length} products.`);
};
