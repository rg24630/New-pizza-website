import { PizzaPreset, ToppingOption } from './types';

export const PIZZA_PRESETS: PizzaPreset[] = [
  {
    id: 'pepperoni',
    name: "Pepperoni Lover's Classic",
    description: 'The ultimate favorite. Topped with double layers of classic pepperoni and extra 100% real mozzarella cheese on our signature baked crust.',
    basePrice: 14.50,
    toppings: ['mozzarella', 'classic_pepperoni'],
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'meat_lovers',
    name: "Meat Lover's Feast",
    description: 'An exceptional choice for meat lovers. Packed with classic pepperoni, seasoned pork sausage, crispy smoked bacon, savory diced ham, and seasoned beef chunks.',
    basePrice: 18.50,
    toppings: ['mozzarella', 'classic_pepperoni', 'pork_sausage', 'crispy_bacon', 'savory_ham', 'beef_chunks'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
  },

  {
    id: 'veggie_lovers',
    name: "Veggie Lover's Delight",
    description: 'A colorful garden combination of fresh sliced mushrooms, crisp green peppers, sweet red onions, sliced black olives, and diced fresh tomatoes.',
    basePrice: 15.50,
    toppings: ['mozzarella', 'fresh_mushrooms', 'green_peppers', 'sweet_onions', 'black_olives', 'fresh_tomatoes'],
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=800',
    isVegetarian: true,
  },
  {
    id: 'cheese_lovers',
    name: "Ultimate Cheese Lover's",
    description: 'Our special creamy garlic sauce topped with an indulgent blend of mozzarella, creamy provolone, and shredded parmesan cheeses.',
    basePrice: 15.00,
    toppings: ['mozzarella', 'creamy_provolone', 'shredded_parmesan'],
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800',
    isVegetarian: true,
  }
];

export const TOPPING_OPTIONS: ToppingOption[] = [
  // Cheeses
  { id: 'mozzarella', name: '100% Real Mozzarella', category: 'cheeses', price: 2.50, color: '#fbfbe7', emoji: '🧀' },
  { id: 'creamy_provolone', name: 'Creamy Provolone', category: 'cheeses', price: 2.00, color: '#ffffff', emoji: '🥛' },
  { id: 'shredded_parmesan', name: 'Shredded Parmesan Blend', category: 'cheeses', price: 2.00, color: '#d2ebdb', emoji: '🟩' },
  { id: 'cheddar_blend', name: 'Golden Cheddar Blend', category: 'cheeses', price: 2.00, color: '#ededdf', emoji: '🌱' },

  // Proteins
  { id: 'classic_pepperoni', name: 'Classic Pepperoni', category: 'proteins', price: 2.50, color: '#be2525', emoji: '🥩' },
  { id: 'pork_sausage', name: 'Seasoned Pork Sausage', category: 'proteins', price: 2.50, color: '#7c4d42', emoji: '🥓' },
  { id: 'crispy_bacon', name: 'Crispy Smoked Bacon', category: 'proteins', price: 2.50, color: '#d76f7f', emoji: '🍖' },
  { id: 'savory_ham', name: 'Savory Sliced Ham', category: 'proteins', price: 2.50, color: '#7c4d42', emoji: '🥓' },
  { id: 'beef_chunks', name: 'Seasoned Beef Chunks', category: 'proteins', price: 2.50, color: '#be2525', emoji: '🥩' },

  // Greens & Veggies
  { id: 'fresh_mushrooms', name: 'Fresh Sliced Mushrooms', category: 'greens', price: 1.50, color: '#a1887f', emoji: '🍄' },
  { id: 'green_peppers', name: 'Crisp Green Peppers', category: 'greens', price: 1.50, color: '#16a34a', emoji: '🌿' },
  { id: 'sweet_onions', name: 'Sweet Red Onions', category: 'greens', price: 1.50, color: '#90a4ae', emoji: '🧅' },
  { id: 'black_olives', name: 'Sliced Black Olives', category: 'greens', price: 1.50, color: '#ffe082', emoji: '🧄' },
  { id: 'fresh_tomatoes', name: 'Diced Fresh Tomatoes', category: 'greens', price: 1.50, color: '#ffe082', emoji: '🧄' },

  // Finishes
  { id: 'garlic_butter', name: 'Signature Garlic Butter Drizzle', category: 'finishes', price: 1.50, color: '#ebd026', emoji: '💎' },
  { id: 'bbq_drizzle', name: 'Sweet BBQ Drizzle', category: 'finishes', price: 1.50, color: '#e67e22', emoji: '🍯' },
  { id: 'buffalo_drizzle', name: 'Buffalo Wing Sauce Drizzle', category: 'finishes', price: 1.50, color: '#2d2d2d', emoji: '🍷' }
];
