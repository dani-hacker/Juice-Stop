import { Juice } from './types';

// Let's use some placeholder stock images based on keyword for now
const getImg = (keyword: string) => `https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=400`;

export const CATEGORIES = [
  'Natural Juice',
  'Milk Shake',
  'Lassi & Colada',
  'Refreshment',
  'Ice Cream Scoop',
  'Gola & Faloda',
  'Ice Cream Shakes'
];

export const JUICES: Juice[] = [
  // 1. Natural Juice
  { id: 'nj-1', category: 'Natural Juice', name: 'Apple Juice', price: 250, color: 'text-red-600', bgColor: 'bg-red-50', description: 'Freshly squeezed apple juice.', image: '/images/products/apple-juice.webp' },
  { id: 'nj-2', category: 'Natural Juice', name: 'Orange Juice', price: 250, color: 'text-orange-500', bgColor: 'bg-orange-50', description: 'Freshly squeezed orange juice.', image: '/images/products/orange-juice.webp' },
  { id: 'nj-3', category: 'Natural Juice', name: 'Carrot Juice', price: 250, color: 'text-orange-600', bgColor: 'bg-orange-50', description: 'Healthy carrot juice.', image: '/images/products/carrot -juice.webp' },
  { id: 'nj-4', category: 'Natural Juice', name: 'Mosambi Juice', price: 250, color: 'text-green-500', bgColor: 'bg-green-50', description: 'Sweet lime juice.', image: '/images/products/mosambi-juice.webp' },
  { id: 'nj-5', category: 'Natural Juice', name: 'Beetroot (Chukandar)', price: 250, color: 'text-red-800', bgColor: 'bg-red-50', description: 'Earthy and rich beetroot juice.', image: '/images/products/beetroot-juice.webp' },
  { id: 'nj-6', category: 'Natural Juice', name: 'Mitta Juice', price: 250, color: 'text-yellow-600', bgColor: 'bg-yellow-50', description: 'Fresh mitta juice.', image: '/images/products/mitta-juice.webp' },
  { id: 'nj-7', category: 'Natural Juice', name: 'Sugar Can', price: 150, color: 'text-yellow-700', bgColor: 'bg-yellow-50', description: 'Natural sugarcane juice.', image: '/images/products/sugarcane-juice.webp' },
  { id: 'nj-8', category: 'Natural Juice', name: 'ABC Fresh Juice', price: 250, color: 'text-red-600', bgColor: 'bg-red-50', description: 'Apple, Beetroot, and Carrot mix.', image: '/images/products/abc-juice.webp' },

  // 2. Milk Shake
  { id: 'ms-1', category: 'Milk Shake', name: 'Apple Shake', variants: [{name: 'Medium', price: 200}, {name: 'XL', price: 250}], color: 'text-red-500', bgColor: 'bg-red-50', description: 'Creamy apple milk shake.', image: '/images/products/apple-milk-shake.webp' },
  { id: 'ms-2', category: 'Milk Shake', name: 'Banana Shake', variants: [{name: 'Medium', price: 200}, {name: 'XL', price: 250}], color: 'text-yellow-500', bgColor: 'bg-yellow-50', description: 'Energetic banana milk shake.', image: '/images/products/banana-milk-shake.webp' },
  { id: 'ms-3', category: 'Milk Shake', name: 'Mango Shake', variants: [{name: 'Medium', price: 200}, {name: 'XL', price: 250}], color: 'text-orange-500', bgColor: 'bg-orange-50', description: 'Rich mango milk shake.', image: '/images/products/mango-milk-shake.webp' },
  { id: 'ms-4', category: 'Milk Shake', name: 'Peach Shake', variants: [{name: 'Medium', price: 200}, {name: 'XL', price: 250}], color: 'text-orange-400', bgColor: 'bg-orange-50', description: 'Sweet peach milk shake.', image: '/images/products/peach-milk-shake.webp' },
  { id: 'ms-5', category: 'Milk Shake', name: 'Strawberry Shake', variants: [{name: 'Medium', price: 250}, {name: 'XL', price: 350}], color: 'text-pink-500', bgColor: 'bg-pink-50', description: 'Classic strawberry milk shake.', image: '/images/products/strawberry-shake-pro.webp' },
  { id: 'ms-6', category: 'Milk Shake', name: 'Mix Shake', variants: [{name: 'Medium', price: 450}, {name: 'XL', price: 600}], color: 'text-stone-700', bgColor: 'bg-stone-100', description: 'Blend of all amazing fruits.', image: '/images/products/mix-milk-shake.webp' },
  { id: 'ms-7', category: 'Milk Shake', name: 'Kaju Badam Shake', variants: [{name: 'Medium', price: 450}, {name: 'XL', price: 600}], color: 'text-stone-800', bgColor: 'bg-stone-50', description: 'Cashew and Almond power shake.', image: '/images/products/kaju-badam-milk-shake.webp' },
  { id: 'ms-8', category: 'Milk Shake', name: 'Anjeer Shake', variants: [{name: 'Medium', price: 450}, {name: 'XL', price: 600}], color: 'text-stone-700', bgColor: 'bg-stone-100', description: 'Healthy fig milk shake.', image: '/images/products/anjeer-milk-shake.webp' },

  // 3. Lassi & Colada
  { id: 'lc-1', category: 'Lassi & Colada', name: 'Sweet Lassi', price: 250, color: 'text-stone-800', bgColor: 'bg-stone-50', description: 'Traditional sweet yogurt drink.', image: '/images/products/sweet-lassi.webp' },
  { id: 'lc-2', category: 'Lassi & Colada', name: 'Mango Lassi', price: 350, color: 'text-orange-500', bgColor: 'bg-orange-50', description: 'Mango flavored traditional lassi.', image: '/images/products/mango-lassi.webp' },
  { id: 'lc-3', category: 'Lassi & Colada', name: 'Lassi with Icecream', price: 350, color: 'text-stone-800', bgColor: 'bg-stone-50', description: 'Lassi topped with rich ice cream.', image: '/images/products/lassi-icecream.webp' },
  { id: 'lc-4', category: 'Lassi & Colada', name: 'Cold Coffee', price: 300, color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Classic chilled coffee.', image: '/images/products/cold-coffee.webp' },
  { id: 'lc-5', category: 'Lassi & Colada', name: 'Ice Cream Coffee', price: 350, color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Cold coffee blended with ice cream.', image: '/images/products/cold-coffee-icecream.webp' },
  { id: 'lc-6', category: 'Lassi & Colada', name: 'Pina Colada', price: 450, color: 'text-yellow-600', bgColor: 'bg-yellow-50', description: 'Pineapple and coconut delight.', image: '/images/products/pina-colada.webp' },

  // 4. Refreshment
  { id: 'rf-1', category: 'Refreshment', name: 'Channa Chat', price: 200, color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Spicy and tangy chickpea snack.', image: '/images/products/channa-chaat.webp' },
  { id: 'rf-2', category: 'Refreshment', name: 'Fruit Chaat / Salad', price: 250, color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Mixed seasonal fresh fruits.', image: '/images/products/fruit-chat.webp' },
  { id: 'rf-3', category: 'Refreshment', name: 'Golgapa 6PC', price: 150, color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Crispy shells with tangy water.', image: '/images/products/golgappy.webp' },// reusing chaat img
  { id: 'rf-4', category: 'Refreshment', name: 'Samosa Chaat', variants: [{name: 'Single', price: 120}, {name: 'Double', price: 180}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Samosa topped with channa and chutneys.', image: '/images/products/samosa-chaat.webp' },
  { id: 'rf-5', category: 'Refreshment', name: 'Dhai Bhalay', price: 200, color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Lentil dumplings in savory yogurt.', image: '/images/products/dahi-bhally.webp' },
  { id: 'rf-6', category: 'Refreshment', name: 'Beef Pulao (Kilo)', price: 1000, color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Aromatic beef pulao per kilogram.', image: '/images/products/beef-pulao-pro.webp' },
  { id: 'rf-7', category: 'Refreshment', name: 'Sweet Rice (Zarda) (Kilo)', price: 1000, color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Sweetened colored rice dessert per kilogram.', image: '/images/products/sweet-rice.webp' },

  // 5. Ice Cream Scoop
  { id: 'ic-0', category: 'Ice Cream Scoop', name: 'Tutti fruity Scoop', variants: [{name: '1 Scoop', price: 150}, {name: '2 Scoops', price: 280}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Delicious Tutti fruity ice cream.', image: '/images/products/tuttifruity-scoop.webp' },
  { id: 'ic-1', category: 'Ice Cream Scoop', name: 'Kulfa Scoop', variants: [{name: '1 Scoop', price: 150}, {name: '2 Scoops', price: 280}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Delicious Kulfa ice cream.', image: '/images/products/kulfa-scoop.webp' },
  { id: 'ic-2', category: 'Ice Cream Scoop', name: 'Pistachio Scoop', variants: [{name: '1 Scoop', price: 150}, {name: '2 Scoops', price: 280}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Delicious Pistachio ice cream.', image: '/images/products/pista-scoop.webp' },
  { id: 'ic-3', category: 'Ice Cream Scoop', name: 'Strawberry Scoop', variants: [{name: '1 Scoop', price: 150}, {name: '2 Scoops', price: 280}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Delicious Strawberry ice cream.', image: '/images/products/strawberry-scoop.webp' },
  { id: 'ic-4', category: 'Ice Cream Scoop', name: 'Vanilla Scoop', variants: [{name: '1 Scoop', price: 150}, {name: '2 Scoops', price: 280}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Delicious Vanilla ice cream.', image: '/images/products/vanilla-scoop.webp' },
  { id: 'ic-5', category: 'Ice Cream Scoop', name: 'Coconut Scoop', variants: [{name: '1 Scoop', price: 150}, {name: '2 Scoops', price: 280}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Delicious Coconut ice cream.', image: '/images/products/coconut-scoop.webp' },
  { id: 'ic-6', category: 'Ice Cream Scoop', name: 'Paraline Scoop', variants: [{name: '1 Scoop', price: 150}, {name: '2 Scoops', price: 280}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Delicious Paraline ice cream.', image: '/images/products/paraline-scoop.webp' },
  { id: 'ic-7', category: 'Ice Cream Scoop', name: 'Mango Scoop', variants: [{name: '1 Scoop', price: 150}, {name: '2 Scoops', price: 280}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Delicious Mango ice cream.', image: '/images/products/mango-scoop.webp' },
  { id: 'ic-8', category: 'Ice Cream Scoop', name: 'Chocolate Chip Scoop', variants: [{name: '1 Scoop', price: 150}, {name: '2 Scoops', price: 280}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Delicious Chocolate Chip ice cream.', image: '/images/products/coco-scoop.webp' },
  { id: 'ic-9', category: 'Ice Cream Scoop', name: 'Coffee Scoop', variants: [{name: '1 Scoop', price: 150}, {name: '2 Scoops', price: 280}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Delicious Coffee ice cream.', image: '/images/products/coffee-scoop.webp' },

  // 6. Gola & Faloda
  { id: 'gf-1', category: 'Gola & Faloda', name: 'Ice Gola', price: 100, color: 'text-purple-600', bgColor: 'bg-purple-50', description: 'Ice shavings with sweet syrups.', image: '/images/products/ice-gola.webp' },
  { id: 'gf-2', category: 'Gola & Faloda', name: 'Kulfi Faluda', price: 250, color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Traditional kulfi with vermicelli.', image: '/images/products/kulfi-faluda.webp' },
  { id: 'gf-3', category: 'Gola & Faloda', name: 'Mint Margarita', price: 200, color: 'text-green-600', bgColor: 'bg-green-50', description: 'Refreshing mint and lemon slush.', image: '/images/products/mint-margarita.webp' },
  { id: 'gf-4', category: 'Gola & Faloda', name: 'Blue Margarita', price: 200, color: 'text-blue-600', bgColor: 'bg-blue-50', description: 'Cool blue lagoon margarita.', image: '/images/products/blue-margarita.webp' },
  { id: 'gf-5', category: 'Gola & Faloda', name: 'Whey Protein 30g', price: 600, color: 'text-stone-800', bgColor: 'bg-stone-100', description: '30g protein shake for fitness.', image: '/images/products/whey-protein.webp' },
  { id: 'gf-6', category: 'Gola & Faloda', name: 'Protein 30g Shake w/ fruits', price: 800, color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Healthy protein mix with fresh fruits.', image: '/images/products/protein-30g.webp' },

  // 7. Ice Cream Shakes
  { id: 'ics-0', category: 'Ice Cream Shakes', name: 'Tutti fruity Shake', variants: [{name: 'Medium', price: 350}, {name: 'Large', price: 450}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Tutti fruity ice cream blended into a shake.', image: '/images/products/tuttifruity-ic-shake.webp' },
  { id: 'ics-1', category: 'Ice Cream Shakes', name: 'Kulfa Shake', variants: [{name: 'Medium', price: 350}, {name: 'Large', price: 450}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Kulfa ice cream blended into a shake.', image: '/images/products/kulfa-ic-shake.webp' },
  { id: 'ics-2', category: 'Ice Cream Shakes', name: 'Pistachio Shake', variants: [{name: 'Medium', price: 350}, {name: 'Large', price: 450}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Pistachio ice cream blended into a shake.', image: '/images/products/pistachio-ic-shake.webp' },
  { id: 'ics-3', category: 'Ice Cream Shakes', name: 'Strawberry Shake', variants: [{name: 'Medium', price: 350}, {name: 'Large', price: 450}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Strawberry ice cream blended into a shake.', image: '/images/products/strawberry-ic-shake.webp' },
  { id: 'ics-4', category: 'Ice Cream Shakes', name: 'Vanilla Shake', variants: [{name: 'Medium', price: 350}, {name: 'Large', price: 450}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Vanilla ice cream blended into a shake.', image: '/images/products/vanilla-ic-shake.webp' },
  { id: 'ics-5', category: 'Ice Cream Shakes', name: 'Coconut Shake', variants: [{name: 'Medium', price: 350}, {name: 'Large', price: 450}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Coconut ice cream blended into a shake.', image: '/images/products/coconut-ic-shake.webp' },
  { id: 'ics-6', category: 'Ice Cream Shakes', name: 'Paraline Shake', variants: [{name: 'Medium', price: 350}, {name: 'Large', price: 450}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Paraline ice cream blended into a shake.', image: '/images/products/paraline-ic-shake.webp' },
  { id: 'ics-7', category: 'Ice Cream Shakes', name: 'Mango Shake', variants: [{name: 'Medium', price: 350}, {name: 'Large', price: 450}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Mango ice cream blended into a shake.', image: '/images/products/mango-ic-shake.webp' },
  { id: 'ics-8', category: 'Ice Cream Shakes', name: 'Chocolate Chip Shake', variants: [{name: 'Medium', price: 350}, {name: 'Large', price: 450}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Chocolate Chip ice cream blended into a shake.', image: '/images/products/chocochip-ic-shake.webp' },
  { id: 'ics-9', category: 'Ice Cream Shakes', name: 'Coffee Shake', variants: [{name: 'Medium', price: 350}, {name: 'Large', price: 450}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Coffee ice cream blended into a shake.', image: '/images/products/coffee-ic-shake.webp' },
  { id: 'ics-a1', category: 'Ice Cream Shakes', name: 'Fresh Banana Shake', variants: [{name: 'Medium', price: 450}, {name: 'Large', price: 550}], color: 'text-yellow-600', bgColor: 'bg-yellow-50', description: 'Fresh banana with ice cream.', image: '/images/products/banana-ice-shake.webp' },
  { id: 'ics-a2', category: 'Ice Cream Shakes', name: 'Fresh Mango Shake', variants: [{name: 'Medium', price: 450}, {name: 'Large', price: 550}], color: 'text-orange-500', bgColor: 'bg-orange-50', description: 'Fresh mango with ice cream.', image: '/images/products/mango-ice-shake.webp' },
  { id: 'ics-a3', category: 'Ice Cream Shakes', name: 'Oreo Ice Cream Shake', variants: [{name: 'Medium', price: 450}, {name: 'Large', price: 550}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Crunchy Oreos blended to perfection.', image: '/images/products/oreo-shake-pro.webp' }
];

export const SHOP_DETAILS = {
  address: 'H26C+G8J Juice stop, Street No 08, Shadman Town, Rawalpindi, Pakistan',
  location: 'Located in: Allied Benk Ltd - ABL, Chakri Road',
  phone: '+923111509923',
  whatsapp: '923111509923',
};

export const REVIEWS = [
  {
    name: 'Afzaal Ch',
    rating: 5,
    comment: 'To Much Good Taste',
    date: '4 months ago',
  },
  {
    name: 'Ali Raza',
    rating: 5,
    comment: 'Fresh and healthy juices. Best in the area!',
    date: '2 days ago',
  },
  {
    name: 'Rawalpindi social media',
    rating: 4,
    comment: 'Great variety of flavors.',
    date: '1 month ago',
  },
];
