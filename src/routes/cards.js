export let categories = [
  {
    id: 1,
    name: "Groceries",
  },
  {
    id: 2,
    name: "Restaurants",
  },
  {
    id: 3,
    name: "Clothing / Dept. Stores",
  },
  {
    id: 4,
    name: "Home Improvement",
  },
  {
    id: 5,
    name: "Gas Stations",
  },
  {
    id: 6,
    name: "Specialty Stores",
  },
];

export let cards = [
  {
    id: 1,
    category: 1,
    selected: false,
    name: "Choices",
    cards: ["$100"],
  },
  { id: 2, category: 1, selected: false, name: "M&M Meats", cards: ["$25"] },
  {
    id: 3,
    category: 1,
    selected: false,
    name: "Safeway / Thriftys Foods",
    cards: ["$25", "$50", "$100"],
  },
  {
    id: 4,
    category: 1,
    selected: false,
    name: "Save-On Foods",
    cards: ["$25", "$50", "$100", "$200"],
  },
  {
    id: 5,
    category: 1,
    selected: false,
    name: "Superstore / Extra Foods / No Frills",
    cards: ["$25", "$50", "$100", "$250"],
  },
  /*{ id: 7, category: 1, selected: false, name: "T&T Market", cards: ["$50"] },*/
  { id: 8, category: 1, selected: false, name: "By Low", cards: ["$25", "$50", "$100"] },
  { id: 9, category: 1, selected: false, name: "Nesters", cards: ["$25", "$50", "$100"] },
  /* Restaurants */
  {
    id: 21,
    category: 2,
    selected: false,
    name: "Boston Pizza",
    cards: ["$25", "$50"],
  },
  {
    id: 23,
    category: 2,
    selected: false,
    name: "Cactus Club",
    cards: ["$25", "$50"],
  },
  {
    id: 24,
    category: 2,
    selected: false,
    name: "Earl's",
    cards: ["$25", "$50"],
  },
  {
    id: 25,
    category: 2,
    selected: false,
    name: "Keg",
    cards: ["$25", "$50", "$100"],
  },
  {
    id: 26,
    category: 2,
    selected: false,
    name: "Starbucks",
    cards: ["$5", "$10", "$25", "$50"],
  },
  {
    id: 27,
    category: 2,
    selected: false,
    name: "Tim Hortons",
    cards: ["$5", "$10", "$25", "$50"],
  },
  /*
    {
      id: 27,
      category: 2,
      selected: false,
      name: "Domino's Pizza",
      cards: ["$25"],
    },*/
  {
    id: 27,
    category: 2,
    selected: false,
    name: "Cara - Multiple Card",
    cards: ["$25", "$50"],
  },
  {
    id: 28,
    category: 2,
    selected: false,
    name: "McDonald's",
    cards: ["$5", "$10", "$25", "$50"],
  },
  {
    id: 29,
    category: 2,
    selected: false,
    name: "Moxie's",
    cards: ["$25", "$50"],
  },
  {
    id: 30,
    category: 2,
    selected: false,
    name: "Old Spagetti Factory",
    cards: ["$25"],
  },
  {
    id: 31,
    category: 2,
    selected: false,
    name: "Red Robin",
    cards: ["$25"],
  },
  {
    id: 32,
    category: 2,
    selected: false,
    name: "Subway",
    cards: ["$10", "$25"],
  },
  {
    id: 33,
    category: 2,
    selected: false,
    name: "White Spot",
    cards: ["$25", "$50"],
  },

  /*** CLOTHING / DEPT. STORES */
  /*
  {
    id: 41,
    category: 3,
    selected: false,
    name: "Hudson Bay / Home Outfitters",
    cards: ["$25", "$50", "$100"],
  },
  */
  {
    id: 43,
    category: 3,
    selected: false,
    name: "Mark's Work Warehouse",
    cards: ["$25", "$50"],
  },
  {
    id: 45,
    category: 3,
    selected: false,
    name: "Options - Old Navy / Banana Rep / Gap / Athleta",
    cards: ["$25", "$50"],
  },
  {
    id: 46,
    category: 3,
    selected: false,
    name: "Sport Chek",
    cards: ["$25", "$50"],
  },
  {
    id: 47,
    category: 3,
    selected: false,
    name: "Walmart",
    cards: ["$25", "$50", "$100"],
  },
  {
    id: 48,
    category: 3,
    selected: false,
    name: "Winners / Marshalls",
    cards: ["$25", "$50"],
  },

  /*** HOME IMPROVEMENT */
  {
    id: 50,
    category: 4,
    selected: false,
    name: "Home Hardware",
    cards: ["$25", "$50"],
  },
  {
    id: 51,
    category: 4,
    selected: false,
    name: "Lowe's",
    cards: ["$25", "$50"],
  },
  {
    id: 52,
    category: 4,
    selected: false,
    name: "Canadian Tire",
    cards: ["$25", "$50", "$100"],
  },
  {
    id: 53,
    category: 4,
    selected: false,
    name: "Home Depot",
    cards: ["$25", "$100"],
  },
  {
    id: 54,
    category: 4,
    selected: false,
    name: "Rona",
    cards: ["$25", "$50"],
  },

  /***** GAS STATIONS */
  {
    id: 60,
    category: 5,
    selected: false,
    name: "Chevron",
    cards: ["$25", "$50", "$100"],
  },
  {
    id: 61,
    category: 5,
    selected: false,
    name: "Esso",
    cards: ["$25"],
  },
  {
    id: 62,
    category: 5,
    selected: false,
    name: "Petro Canada",
    cards: ["$25", "$50", "$100"],
  },
  {
    id: 63,
    category: 5,
    selected: false,
    name: "Shell",
    cards: ["$25", "$50", "$100"],
  },

  /***** SPECIALTY STORES */
  /*
  {
    id: 71,
    category: 6,
    selected: false,
    name: "Bath and Body Works",
    cards: ["$25"],
  },
  */
  {
    id: 72,
    category: 6,
    selected: false,
    name: "Best Buy",
    cards: ["$25", "$50", "$100", "$250"],
  },
  {
    id: 73,
    category: 6,
    selected: false,
    name: "Chapters",
    cards: ["$25", "$50"],
  },
  {
    id: 74,
    category: 6,
    selected: false,
    name: "Cineplex",
    cards: ["$25", "$50"],
  },
  {
    id: 75,
    category: 6,
    selected: false,
    name: "Amazon.ca Digital Cards (not Amazon.com)",
    cards: ["$50", "$100"],
  },
  {
    id: 76,
    category: 6,
    selected: false,
    name: "Dollarama",
    cards: ["$25", "$50"],
  },
  {
    id: 77,
    category: 6,
    selected: false,
    name: "Shoppers Drug Mart",
    cards: ["$25", "$50"],
  },
  {
    id: 78,
    category: 6,
    selected: false,
    name: "London Drugs",
    cards: ["$25", "$100"],
  },
  {
    id: 79,
    category: 6,
    selected: false,
    name: "Staples",
    cards: ["$25", "$100"],
  },
  {
    id: 80,
    category: 6,
    selected: false,
    name: "Toys 'R Us",
    cards: ["$25"],
  },
  {
    id: 81,
    category: 6,
    selected: false,
    name: "Fairmount Hotels",
    cards: ["$100"],
  },
  {
    id: 82,
    category: 6,
    selected: false,
    name: "Spa Utopia",
    cards: ["$50", "$100"],
  },

];