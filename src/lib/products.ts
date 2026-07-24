export type Product = {
  id: number;
  name: string;
  price: string;
  tag: string;
  image: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Spider Emblem Polo",
    price: "$39.99",
    tag: "Polo",
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1784348699_8427525.jpg?w=480&dpr=2",
  },
  {
    id: 2,
    name: "'Webster' Oversized Tee",
    price: "$34.99",
    tag: "Oversized",
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1782931010_7127742.jpg?w=480&dpr=2",
  },
  {
    id: 3,
    name: "Classic Spider Backpack",
    price: "$69.99",
    tag: "Backpack",
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1774949318_3340614.jpg?w=480&dpr=2",
  },
  {
    id: 4,
    name: "Spider Emblem Cap",
    price: "$24.99",
    tag: "Cap",
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1784614207_9013771.jpg?w=480&dpr=2",
  },
  {
    id: 5,
    name: "Miles Morales Backpack",
    price: "$74.99",
    tag: "Backpack",
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1784868951_9278348.jpg?w=480&dpr=2",
  },
  {
    id: 6,
    name: "Spider Applique Tee",
    price: "$44.99",
    tag: "Oversized",
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1764840376_2935669.jpg?w=480&dpr=2",
  },
];
