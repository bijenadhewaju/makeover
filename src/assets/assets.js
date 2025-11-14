import user from "./icon.png";
import icon from "./icon.png";
import carousel1 from "./carousel1.png";
import carousel2 from "./carousel2.jpg";
import carousel3 from "./carousel3.png";
import carousel4 from "./carousel4.jpg";
import carousel5 from "./carousel5.jpg";
import women from "./women.png";
import dress from "./Dress.jpg";
import coupons from "./coupons.png";
import brand from "./Brand.jpg";
import banner from "./Banner2.png";
import sign from "./signuppage.png";

export const assets = {
  icon,
  carousel1,
  carousel2,
  carousel3,
  carousel4,
  carousel5,
  user,
  dress,
  coupons,
  banner,
  sign,
};

// categories of customers
export const categories = [
  { category: "Women", Image: women, offer: "Upto 50% Off" },
  { category: "Men", Image: women, offer: "Upto 30% Off" },
  { category: "Children", Image: women, offer: "Upto 25% Off" },
  { category: "Beauty", Image: women, offer: "Flat 10% Off" },
  { category: "Makeup", Image: women, offer: "Upto 20% Off" },
  { category: "Skincare", Image: women, offer: "Buy 1 Get 1 Free" },
  { category: "Accessories", Image: women, offer: "Flat 15% Off" },
];

// enhanced product data
export const productsData = [
  {
    id: 1,
    name: "Professional Makeup Kit",
    image: dress,
    isBestseller: true,
    rating: 4.6,
    reviews: 311,
    price: 2799,
    discountedPrice: 2799,
    category: ["makeup", "beauty", "women"],  
    description: "Professional Makeup Kit includes a variety of high-quality makeup products such as foundation, eyeshadow, lipstick, and brushes to create stunning looks for any occasion."
  },
  {
    id: 2,
    name: "Skincare Bundle",
    image: dress,
    isBestseller: false,
    rating: 4.6,
    reviews: 311,
    price: 2150,
    discountedPrice: 1899,
    category: ["skincare", "beauty", "women", "men"],
    description: "Skincare Bundle includes cleanser, toner, moisturizer, and sunscreen to provide a complete skincare routine for healthy and glowing skin."
  },
  {
    id: 3,
    name: "Hair Care Set",
    image: dress,
    isBestseller: true,
    rating: 4.6,
    reviews: 311,
    price: 1720,
    discountedPrice: 1599,
    category: ["hair", "beauty", "women", "men"],
    description: "Hair Care Set includes shampoo, conditioner, and styling products to keep your hair healthy and vibrant."
  },
  {
    id: 4,
    name: "Perfume Collection",
    image: dress,
    isBestseller: false,
    rating: 4.6,
    reviews: 311,
    price: 3665,
    discountedPrice: 3299,
    category: ["fragrance", "men", "women"],
    description: "Perfume Collection offers a range of captivating scents for both    men and women,  designed to leave a lasting impression."
  },
  {
    id: 5,
    name: "Makeup Brushes Set",
    image: dress,
    isBestseller: true,
    rating: 4.6,
    reviews: 311,
    price: 1546,
    discountedPrice: 1299,
    category: ["tools", "makeup", "women", "beauty"],
    description: "Makeup Brushes Set includes a variety of high-quality brushes designed for flawless makeup application, suitable for both beginners and professionals."
  },
  {
    id: 6,
    name: "Lipstick Collection",
    image: dress,
    isBestseller: true,
    rating: 4.6,
    reviews: 311,
    price: 999,
    discountedPrice: 899,
    category: ["makeup", "beauty", "women"],
    description: "Lipstick Collection offers a variety of vibrant shades and long-lasting formulas to enhance your lips' natural beauty."
  },
  {
    id: 7,
    name: "Face Serum",
    image: dress,
    isBestseller: false,
    rating: 4.4,
    reviews: 245,
    price: 1764,
    discountedPrice: 1499,
    category: ["skincare", "men", "women"],
    description: "Face Serum is a lightweight, fast-absorbing formula that delivers intense hydration and nourishment to the skin, promoting a radiant and youthful complexion."
  },
  {
    id: 8,
    name: "Nail Polish Set",
    image: dress,
    isBestseller: false,
    rating: 4.3,
    reviews: 189,
    price: 874,
    discountedPrice: 699,
    category: ["beauty", "makeup", "women", "kids"],
    description: "Nail Polish Set offers a variety of vibrant colors and long-lasting formulas to keep your nails looking stylish and beautiful."
  },
  {
    id: 9,
    name: "Kids Gentle Shampoo",
    image: dress,
    isBestseller: true,
    rating: 4.7,
    reviews: 220,
    price: 670,
    discountedPrice: 549,
    category: ["hair", "kids", "skincare"],
    description: "Kids Gentle Shampoo is specially formulated to cleanse and nourish children's hair, leaving it soft, manageable, and healthy."
  },
  {
    id: 10,
    name: "Men’s Beard Grooming Kit",
    image: dress,
    isBestseller: true,
    rating: 4.5,
    reviews: 275,
    price: 1999,
    discountedPrice: 1799,
    category: ["men", "hair", "tools"],
    description: "Men’s Beard Grooming Kit includes essential products for maintaining a well-groomed beard, promoting healthy hair growth and skin care."
  },
  {
    id: 11,
    name: "Sunscreen SPF 50+",
    image: dress,
    isBestseller: false,
    rating: 4.6,
    reviews: 192,
    price: 1135,
    discountedPrice: 999,
    category: ["skincare", "makeup", "men", "women"],
    description: "Sunscreen SPF 50+ provides high-level protection against harmful UV rays, helping to prevent sunburn and skin damage while keeping the skin hydrated."
  },
  {
    id: 12,
    name: "Hydrating Face Mist",
    image: dress,
    isBestseller: false,
    rating: 4.5,
    reviews: 165,
    price: 985,
    discountedPrice: 899,
    category: ["skincare", "beauty", "women", "kids"],
    description: "Hydrating Face Mist refreshes and revitalizes the skin, providing instant hydration and a radiant glow throughout the day."
  },
  {
    id: 13,
    name: "Hair Styling Gel",
    image: dress,
    isBestseller: true,
    rating: 4.4,
    reviews: 150,
    price: 555,
    discountedPrice: 499,
    category: ["hair", "men", "kids"],
    description: "Hair Styling Gel provides strong hold and a sleek finish, perfect for creating various hairstyles."
  },
  {
    id: 14,
    name: "Baby Lotion",
    image: dress,
    isBestseller: true,
    rating: 4.8,
    reviews: 320,
    price: 705,
    discountedPrice: 599,
    category: ["skincare", "kids", "gentle-care"],
    description: "Baby Lotion is a gentle and nourishing lotion designed specifically for a baby's delicate skin, providing hydration and protection."
  },
  {
    id: 15,
    name: "Unisex Deodorant Spray",
    image: dress,
    isBestseller: true,
    rating: 4.6,
    reviews: 290,
    price: 888,
    discountedPrice: 799,
    category: ["fragrance", "men", "women"],
    description: "Unisex Deodorant Spray offers long-lasting freshness and a pleasant scent, suitable for both men and women."
  },

  // ---- Accessories Section ----
  {
    id: 16,
    name: "Classic Leather Strap Watch",
    image: dress,
    isBestseller: true,
    rating: 4.7,
    reviews: 410,
    price: 4499,
    discountedPrice: 3599,
    category: ["accessories", "watch", "men", "fashion"],   
    description: "Classic Leather Strap Watch is a timeless accessory that combines elegance and functionality, perfect for everyday wear."
  },
  {
    id: 17,
    name: "Rose Gold Bracelet Watch",
    image: dress,
    isBestseller: true,
    rating: 4.8,
    reviews: 520,
    price: 4599,
    discountedPrice: 3899,
    category: ["accessories", "watch", "women", "fashion"],
    description: "Rose Gold Bracelet Watch is a stylish accessory that combines elegance and functionality, perfect for enhancing any outfit."
  },
  {
    id: 18,
    name: "Silver Hoop Earrings",
    image: dress,
    isBestseller: false,
    rating: 4.5,
    reviews: 220,
    price: 899,
    discountedPrice: 799,
    category: ["accessories", "jewelry", "women"],
    description: "Silver Hoop Earrings are elegant accessories that add a touch of sophistication to any outfit, perfect for both casual and formal occasions."
  },
  {
    id: 19,
    name: "Men’s Stainless Steel Chain",
    image: dress,
    isBestseller: false,
    rating: 4.4,
    reviews: 190,
    price: 1135,
    discountedPrice: 999,
    category: ["accessories", "jewelry", "men"],
    description: "Men’s Stainless Steel Chain is a stylish accessory that adds a touch of sophistication to any outfit, perfect for everyday wear or special occasions."
  },
  {
    id: 20,
    name: "Kids Friendship Bracelet Set",
    image: dress,
    isBestseller: true,
    rating: 4.7,
    reviews: 260,
    price: 610,
    discountedPrice: 499,
    category: ["accessories", "kids", "jewelry"],
    description: "Kids Friendship Bracelet Set is a charming collection of bracelets designed for children, promoting friendship and style."
  },
];

export const brands = [
  {
    id: 1,
    name: "L'Oreal",
    image: brand,
    discount: "Flat 4% Discount",
    tagline: "Premium haircare products",
    category: "Hair Care",
    description: "L'Oreal offers a wide range of premium haircare products designed to nourish and revitalize your hair."
  },
  {
    id: 2,
    name: "Maybelline",
    image: brand,
    discount: "Flat 4% Discount",
    tagline: "Professional makeup collection",
    category: "Makeup",
    description: "Maybelline provides a professional makeup collection that enhances your natural beauty with vibrant colors and long-lasting formulas."
  },
  {
    id: 3,
    name: "Lakme",
    image: brand,
    discount: "Flat 4% Discount",
    tagline: "Expertly crafted beauty solutions",
    category: "Beauty",
    description: "Lakme offers expertly crafted beauty solutions that cater to diverse skin tones and preferences."
  },
  {
    id: 4,
    name: "MAC",
    image: brand,
    discount: "Flat 4% Discount",
    tagline: "Luxury cosmetic products",
    category: "Cosmetics",
    description: "MAC is renowned for its luxury cosmetic products that deliver high performance and bold looks for every occasion."
  },
  {
    id: 5,
    name: "Nike",
    image: brand,
    discount: "Flat 4% Discount",
    tagline: "Latest fashion trends",
    category: "Fashion",
    description: "Nike offers the latest fashion trends in sportswear and casual clothing, combining style with comfort and performance."
  },
  {
    id: 6,
    name: "Dove",
    image: brand,
    discount: "Flat 4% Discount",
    tagline: "Skincare essentials",
    category: "Skincare",
    description: "Dove provides essential skincare products that focus on gentle cleansing and deep hydration for all skin types."
  },
  {
    id: 7,
    name: "Garnier",
    image: brand,
    discount: "Flat 4% Discount",
    tagline: "Natural beauty products",
    category: "Beauty",
    description: "Garnier offers a range of natural beauty products that harness the power of nature to enhance your skin and hair health."
  },
  {
    id: 8,
    name: "Ponds",
    image: brand,
    discount: "Flat 4% Discount",
    tagline: "Daily skincare routine",
    category: "Skincare",
    description: "Ponds provides products that are perfect for your daily skincare routine, focusing on cleansing, moisturizing, and anti-aging solutions."
  },
  {
    id: 9,
    name: "Colorbar",
    image: brand,
    discount: "Flat 4% Discount",
    tagline: "Vibrant color palette",
    category: "Makeup",
    description: "Colorbar offers a vibrant color palette in its makeup products, allowing you to express your unique style with confidence."
  },
];
