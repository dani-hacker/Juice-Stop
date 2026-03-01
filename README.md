# Juice Stop - Premium E-Commerce Website

![Juice Stop Preview](https://images.unsplash.com/photo-1600271886742-f049cd451b66?q=80&w=1200&auto=format&fit=crop)

**Juice Stop** is a modern, high-end, and fully responsive e-commerce landing page built for a premium Pakistani juice shop. The website features an ultra-premium dark luxury aesthetic, dynamic smooth animations, and a seamless checkout experience powered by direct WhatsApp integration.

---

## 🌟 Key Features

### ✨ Premium Aesthetic & Design

- **Dark Luxury Theme:** Utilizing deep blacks (`#151515`) combined with crisp whites and vibrant red accents (`#e20a16`) to create a striking portfolio-worthy aesthetic.
- **Glassmorphism:** Navigation and modals use backdrop blur effects (`backdrop-blur-xl`) to look sleek and modern.
- **Responsive Animations:** Powered by `framer-motion` for buttery smooth reveal animations, floating 3D parallax effects in the Hero section, and fully interactive hover states across the application.

### 🛍️ WhatsApp Ordering System

- **Cart Management:** Fully functional shopping cart allowing users to add juices, increment/decrement quantities, and remove items.
- **Direct Checkout:** Users can "Order Now" individually or "Checkout" their entire cart.
- **Address Collection:** A built-in modal captures the user's delivery address before finalizing the order.
- **Automated Messaging:** Orders are compiled, formatted with items, totals, and the captured address, then securely sent to the store's configured WhatsApp number natively.

### 📱 Responsive Layout & Sections

- **Hero:** Split-screen layout featuring a CSS-masked image trick to blend full-bleed photography with stark HTML typography.
- **Our Story (Philosophy):** Light-themed contrasting section highlighting natural ingredient sourcing.
- **Menu (Products):** Display grid of premium products fetched dynamically from `constants.ts`.
- **The Fresh Difference (Benefits):** 3-column feature area noting 100% organic, cold-pressed, immunity-boosting features.
- **Customer Reviews Carousel:** Centralized, auto-wrapping dynamic slider displaying localized customer feedback with star ratings.
- **Location integration:** Footer-tied physical address linked straight to Google Maps routes.

---

## 🛠️ Technology Stack

| Technology        | Purpose                                                              |
| ----------------- | -------------------------------------------------------------------- |
| **React (Vite)**  | Frontend framework for incredibly fast HMR and component building    |
| **TypeScript**    | Static typing for robust code and type-safe data (Juices, CartItems) |
| **Tailwind CSS**  | Utility-first CSS framework for rapid and precise styling            |
| **Framer Motion** | React animation library for the hero imagery, modals, and carousel   |
| **Lucide React**  | Premium open-source SVG icons used throughout the site               |

---

## 🚀 Getting Started & Installation

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd juice-stop
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   _(Ensure you have Tailwind, Framer Motion, and Lucide React installed)_

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

---

## 📂 Project Architecture

### `src/App.tsx`

The core component of the application. It holds all the primary state (Cart, Address Modal, Review Carousel Index) and maps out every UI section sequentially:

1. `<header>` - Sticky glass-pane navigation
2. `<section className="Hero">` - First impression landing
3. `<section id="philosophy">` - About us
4. `<section id="products">` - Core shopping experience
5. `<section id="benefits">` - Why choose us
6. `<section id="reviews">` - Trust and social proof
7. `<section id="location">` - Physical visit details
8. `Cart Sidebar` - `framer-motion` slide-out menu
9. `Address Delivery Modal` - Popup handling WA formatting

### `src/constants.ts`

This acts as the mock database and configuration file for the site.

- `JUICES`: Array of objects defining `id`, `name`, `price`, `description`, and `image` URLs.
- `REVIEWS`: Customer review data array.
- `SHOP_DETAILS`: Configures the physical location string, map link, phone number, and crucially, the **WhatsApp Number** used for routing all orders.

### `src/types.ts` (implied by types in App)

Defines the `interface Juice` and `interface CartItem` for TypeScript safety.

---

## 💬 How the WhatsApp Integration Works

When a user intends to purchase, the flow operates without a designated backend server:

1. **Trigger:** `handleOrderNow()` or `handleCheckout()` fires.
2. **Modal Invocation:** State hooks open `isAddressModalOpen`, requesting physical delivery details.
3. **Drafting:** `confirmOrderAndSendWa()` takes the global `cart` state or the `pendingOrder` object and compiles a human-readable string:

   ```txt
   Hello Juice Stop! I would like to place an order:
   - Apple Juice (x2): Rs. 500

   Delivery Address: 123 Main St, Bahria Town

   Total Price: Rs. 500

   Please confirm my order. Thanks!
   ```

4. **Redirection:** The complete text is encoded via `encodeURIComponent()` and injected into the dynamic link:
   `https://wa.me/{STORE_NUMBER}?text={ENCODED_MESSAGE}`
5. **Dispatch:** `window.open()` fires, natively opening WhatsApp Desktop or WhatsApp Web on desktop browsers, or launching the WhatsApp App on mobile devices instantly with the filled-out text.

---

## 🎨 Theme Customization

To change the primary accent color from Red (`#e20a16`) to another brand color, run a workspace-wide Find & Replace in `App.tsx` and `constants.ts` for `#e20a16` and generic `bg-red-600` Tailwind classes.

To modify shop details or swap products, edit the exported objects inside `src/constants.ts`.
