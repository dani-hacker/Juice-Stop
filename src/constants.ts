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
  'Ice Cream Shakes',
  'Fast Food'
];

export const JUICES: Juice[] = [
  // 1. Natural Juice
  { id: 'nj-grouped-1', category: 'Natural Juice', name: 'Fresh Natural Juices', price: 250, flavors: ['Apple', 'Orange', 'Carrot', 'Mosambi', 'Beetroot', 'Mitta', 'ABC Mix'], color: 'text-red-600', bgColor: 'bg-red-50', description: 'Freshly squeezed 100% natural juices. Choose your flavor.', image: '/images/products/apple-juice.webp' },
  { id: 'nj-7', category: 'Natural Juice', name: 'Sugar Can', price: 150, color: 'text-yellow-700', bgColor: 'bg-yellow-50', description: 'Natural sugarcane juice.', image: '/images/products/sugarcane-juice.webp' },

  // 2. Milk Shake
  { id: 'ms-grouped-1', category: 'Milk Shake', name: 'Classic Milk Shakes', variants: [{name: 'Medium', price: 200}, {name: 'XL', price: 250}], flavors: ['Apple', 'Banana', 'Mango', 'Peach'], color: 'text-yellow-500', bgColor: 'bg-yellow-50', description: 'Rich and creamy classic milk shakes. Choose your flavor and size.', image: '/images/products/mango-milk-shake.webp' },
  { id: 'ms-5', category: 'Milk Shake', name: 'Strawberry Shake', variants: [{name: 'Medium', price: 250}, {name: 'XL', price: 350}], color: 'text-pink-500', bgColor: 'bg-pink-50', description: 'Classic strawberry milk shake.', image: '/images/products/strawberry-shake-pro.webp' },
  { id: 'ms-grouped-2', category: 'Milk Shake', name: 'Premium Milk Shakes', variants: [{name: 'Medium', price: 450}, {name: 'XL', price: 600}], flavors: ['Mix Fruits', 'Kaju Badam', 'Anjeer'], color: 'text-stone-700', bgColor: 'bg-stone-100', description: 'Luxurious premium shakes loaded with nutrition.', image: '/images/products/kaju-badam-milk-shake.webp' },

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
  { id: 'rf-3', category: 'Refreshment', name: 'Golgapa 6PC', price: 150, color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Crispy shells with tangy water.', image: '/images/products/golgappy.webp' },
  { id: 'rf-4', category: 'Refreshment', name: 'Samosa Chaat', variants: [{name: 'Single', price: 120}, {name: 'Double', price: 180}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Samosa topped with channa and chutneys.', image: '/images/products/samosa-chaat.webp' },
  { id: 'rf-5', category: 'Refreshment', name: 'Dhai Bhalay', price: 200, color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Lentil dumplings in savory yogurt.', image: '/images/products/dahi-bhally.webp' },

  // 5. Ice Cream Scoop
  { id: 'ic-grouped', category: 'Ice Cream Scoop', name: 'Ice Cream Scoops', flavors: ['Tutti fruity', 'Kulfa', 'Pistachio', 'Strawberry', 'Vanilla', 'Coconut', 'Paraline', 'Mango', 'Chocolate Chip', 'Coffee'], variants: [{name: '1 Scoop', price: 150}, {name: '2 Scoops', price: 280}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Delicious premium ice cream scoops. Choose your favorite flavor.', image: '/images/products/tuttifruity-scoop.webp' },

  // 6. Gola & Faloda
  { id: 'gf-1', category: 'Gola & Faloda', name: 'Ice Gola', price: 100, color: 'text-purple-600', bgColor: 'bg-purple-50', description: 'Ice shavings with sweet syrups.', image: '/images/products/ice-gola.webp' },
  { id: 'gf-2', category: 'Gola & Faloda', name: 'Kulfi Faluda', price: 250, color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Traditional kulfi with vermicelli.', image: '/images/products/kulfi-faluda.webp' },
  { id: 'gf-3', category: 'Gola & Faloda', name: 'Mint Margarita', price: 200, color: 'text-green-600', bgColor: 'bg-green-50', description: 'Refreshing mint and lemon slush.', image: '/images/products/mint-margarita.webp' },
  { id: 'gf-4', category: 'Gola & Faloda', name: 'Blue Margarita', price: 200, color: 'text-blue-600', bgColor: 'bg-blue-50', description: 'Cool blue lagoon margarita.', image: '/images/products/blue-margarita.webp' },
  { id: 'gf-5', category: 'Gola & Faloda', name: 'Whey Protein 30g', price: 600, color: 'text-stone-800', bgColor: 'bg-stone-100', description: '30g protein shake for fitness.', image: '/images/products/whey-protein.webp' },
  { id: 'gf-6', category: 'Gola & Faloda', name: 'Protein 30g Shake w/ fruits', price: 800, color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Healthy protein mix with fresh fruits.', image: '/images/products/protein-30g.webp' },

  // 7. Ice Cream Shakes
  { id: 'ics-grouped-1', category: 'Ice Cream Shakes', name: 'Classic Ice Cream Shakes', flavors: ['Tutti fruity', 'Kulfa', 'Pistachio', 'Strawberry', 'Vanilla', 'Coconut', 'Paraline', 'Mango', 'Chocolate Chip', 'Coffee'], variants: [{name: 'Medium', price: 400}, {name: 'Large', price: 500}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Rich ice cream blended into a thick shake. Choose your flavor.', image: '/images/products/strawberry-ic-shake.webp' },
  { id: 'ics-grouped-2', category: 'Ice Cream Shakes', name: 'Sniker Ice Cream Shake', price: 600, color: 'text-orange-500', bgColor: 'bg-orange-50', description: 'Ultimate premium thick shake with Sniker and fresh ice cream.', image: 'https://mymorningmocha.com/wp-content/uploads/2022/07/Snickers-milkshake-recipe.jpg' },
  { id: 'ics-grouped-3', category: 'Ice Cream Shakes', name: 'Oreo Ice Cream Shake', variants: [{name: 'Medium', price: 450}, {name: 'Large', price: 550}], color: 'text-stone-800', bgColor: 'bg-stone-100', description: 'Delicious thick shake blended with crunchy Oreo cookies and premium ice cream.', image: 'https://www.whiskaffair.com/wp-content/uploads/2020/07/Oreo-Milkshake-2-3.jpg' },

  // 8. Fast Food
  { id: 'ff-1', category: 'Fast Food', name: 'Dill Wala Burger', price: 220, color: 'text-red-700', bgColor: 'bg-red-50', description: 'Special heart-shaped bun with signature patty.', image: '/images/products/dill-wala-burger.webp' },
  { id: 'ff-2', category: 'Fast Food', name: 'Shami Burger', price: 100, color: 'text-amber-700', bgColor: 'bg-amber-50', description: 'Classic street style soft shami burger.', image: 'https://images.deliveryhero.io/image/fd-pk/LH/qzte-listing.jpg' },
  { id: 'ff-3', category: 'Fast Food', name: 'Anda Shami Burger', price: 150, color: 'text-amber-600', bgColor: 'bg-amber-50', description: 'Traditional shami burger layered with fried egg.', image: 'https://images.deliveryhero.io/image/fd-pk/LH/qzte-listing.jpg' },
  { id: 'ff-4', category: 'Fast Food', name: 'Double Anda Wrap Burger', price: 200, color: 'text-orange-600', bgColor: 'bg-orange-50', description: 'Unique wrapped burger loaded with double egg.', image: 'https://images.deliveryhero.io/image/fd-pk/Products/7771028.jpg?width=%s' },
  { id: 'ff-5', category: 'Fast Food', name: 'Shami Chicken Burger', price: 250, color: 'text-yellow-700', bgColor: 'bg-yellow-50', description: 'Fusion burger with chicken and shami kabab.', image: 'https://i.pinimg.com/474x/63/12/ca/6312ca746ff19f328808089386f32bcc.jpg' },
  { id: 'ff-6', category: 'Fast Food', name: 'Anda Shami Chicken Burger', price: 280, color: 'text-orange-700', bgColor: 'bg-orange-50', description: 'The ultimate loaded chicken and egg shami burger.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROqNvAM_Tjo-bKjs33hCDIAUhdFd1OlSb5lA&s' },
  { id: 'ff-7', category: 'Fast Food', name: 'Chicken Shawarma M/L', variants: [{name: 'Medium', price: 150}, {name: 'Large', price: 200}], color: 'text-red-600', bgColor: 'bg-red-50', description: 'Authentic roasted chicken wrapped in pita.', image: 'https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/rhoaiclqj1rrhfxnln5y' },
  { id: 'ff-8', category: 'Fast Food', name: 'Finger Fries Simple', price: 100, color: 'text-yellow-500', bgColor: 'bg-yellow-50', description: 'Crispy golden hot french fries.', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=400' },
  { id: 'ff-9', category: 'Fast Food', name: 'Sosis Finger Fries', price: 150, color: 'text-red-500', bgColor: 'bg-red-50', description: 'Finger fries mixed with savory sausages.', image: 'https://thumbs.dreamstime.com/b/fries-french-tomato-sauce-sweet-potato-finger-chips-golden-fried-potatoes-junk-food-snack-kraft-paper-closeup-333200567.jpg' },
  { id: 'ff-10', category: 'Fast Food', name: 'Loaded Frise', price: 350, color: 'text-amber-800', bgColor: 'bg-amber-50', description: 'Fries fully loaded with meats, cheese and signature sauces.', image: 'https://therecipecritic.com/wp-content/uploads/2023/02/loaded-fries-4.jpg' }
];

export const SHOP_DETAILS = {
  address: 'H26C+G8J Juice stop, Street No 08, Shadman Town, Rawalpindi, Pakistan',
  location: 'Located in: Opposite side of Allied Benk Ltd - ABL, Chakri Road',
  phone: '+923165269228',
  whatsapp: '923165269228',
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
