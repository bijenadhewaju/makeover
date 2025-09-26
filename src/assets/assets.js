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
};

// categories of customers
export const categories = [
  {
    category: "Women",
    Image: women,
    offer: "Upto 50% Off",
  },
  {
    category: "Men",
    Image: women,
    offer: "Upto 30% Off",
  },
  {
    category: "Children",
    Image: women,
    offer: "",
  },
  {
    category: "Children",
    Image: women,
    offer: "",
  },
  {
    category: "Women",
    Image: women,
    offer: "Upto 50% Off",
  },
  {
    category: "Women",
    Image: women,
    offer: "Upto 50% Off",
  },
  {
    category: "Women",
    Image: women,
    offer: "",
  },
];

export const productsData = [
  {
    id: 1,
    name: "Professional Makeup Kit",
    image: dress,
    isBestseller: true,
    rating: 4.6,
    reviews: 311,
    discount: 10,
    price: 2499,
    originalPrice: 2799,
    category: "makeup",
  },
  {
    id: 2,
    name: "Skincare Bundle",
    image: dress,
    isBestseller: false,
    rating: 4.6,
    reviews: 311,
    discount: 12,
    price: 1899,
    originalPrice: 2150,
    category: "skincare",
  },
  {
    id: 3,
    name: "Hair Care Set",
    image: dress,
    isBestseller: true,
    rating: 4.6,
    reviews: 311,
    discount: 7,
    price: 1599,
    originalPrice: 1720,
    category: "hair",
  },
  {
    id: 4,
    name: "Perfume Collection",
    image: dress,
    isBestseller: false,
    rating: 4.6,
    reviews: 311,
    discount: 10,
    price: 3299,
    originalPrice: 3665,
    category: "fragrance",
  },
  {
    id: 5,
    name: "Makeup Brushes Set",
    image: dress,
    isBestseller: true,
    rating: 4.6,
    reviews: 311,
    discount: 16,
    price: 1299,
    originalPrice: 1546,
    category: "tools",
  },
  {
    id: 6,
    name: "Lipstick Collection",
    image: dress,
    isBestseller: true,
    rating: 4.6,
    reviews: 311,
    discount: 10,
    price: 899,
    originalPrice: 999,
    category: "makeup",
  },
  {
    id: 7,
    name: "Face Serum",
    image: dress,
    isBestseller: false,
    rating: 4.4,
    reviews: 245,
    discount: 15,
    price: 1499,
    originalPrice: 1764,
    category: "skincare",
  },
  {
    id: 8,
    name: "Nail Polish Set",
    image: dress,
    isBestseller: false,
    rating: 4.3,
    reviews: 189,
    discount: 20,
    price: 699,
    originalPrice: 874,
    category: "beauty",
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
  },
  {
    id: 2,
    name: "Maybelline",
    image: brand,
    discount: "Flat 4% Discount",
    tagline: "Professional makeup collection",
    category: "Makeup",
  },
  {
    id: 3,
    name: "Lakme",
    image: brand,
    discount: "Flat 4% Discount",
    tagline: "Expertly crafted beauty solutions",
    category: "Beauty",
  },
  {
    id: 4,
    name: "MAC",
    image: brand,
    discount: "Flat 4% Discount",
    tagline: "Luxury cosmetic products",
    category: "Cosmetics",
  },
  {
    id: 5,
    name: "Nike",
    image: brand,
    discount: "Flat 4% Discount",
    tagline: "Latest fashion trends",
    category: "Fashion",
  },
  {
    id: 6,
    name: "Dove",
    image: brand,
    discount: "Flat 4% Discount",
    tagline: "Skincare essentials",
    category: "Skincare",
  },
  {
    id: 7,
    name: "Garnier",
    image: brand,
    discount: "Flat 4% Discount",
    tagline: "Natural beauty products",
    category: "Beauty",
  },
  {
    id: 8,
    name: "Ponds",
    image: brand,
    discount: "Flat 4% Discount",
    tagline: "Daily skincare routine",
    category: "Skincare",
  },
  {
    id: 9,
    name: "Colorbar",
    image: brand,
    discount: "Flat 4% Discount",
    tagline: "Vibrant color palette",
    category: "Makeup",
  },
];
