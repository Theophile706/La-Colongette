import type { MenuSection } from '@/types'

/**
 * RESTAURANT MENU DATA
 * --------------------
 * Update prices in Ariary (Ar) or your preferred currency.
 * To add a new dish, append an item to the relevant section's `items` array.
 */
export const menuSections: MenuSection[] = [
  {
    id: 'starters',
    title: 'Entrées',
    titleEn: 'Starters',
    items: [
      {
        id: 's1',
        name: 'Salade de crudités du jardin',
        nameEn: 'Garden salad',
        description: 'Légumes frais de notre potager, vinaigrette maison',
        descriptionEn: 'Fresh vegetables from our garden, homemade dressing',
        price: 12000,
      },
      {
        id: 's2',
        name: 'Samoussas malgaches',
        nameEn: 'Malagasy samosas',
        description: 'Trois pièces, viande ou légumes, sauce pimentée',
        descriptionEn: 'Three pieces, meat or vegetable, chili sauce',
        price: 10000,
      },
      {
        id: 's3',
        name: 'Soupe de courge et gingembre',
        nameEn: 'Squash and ginger soup',
        description: 'Velouté onctueux, crème fraîche',
        descriptionEn: 'Creamy velouté, fresh cream',
        price: 11000,
      },
    ],
  },
  {
    id: 'mains',
    title: 'Plats Principaux',
    titleEn: 'Main Courses',
    items: [
      {
        id: 'm1',
        name: 'Romazava traditionnel malgache',
        nameEn: 'Traditional Malagasy Romazava',
        description: 'Bouillon de viande et brèdes mafana, riz blanc',
        descriptionEn: 'Meat broth with mafana greens, white rice',
        price: 28000,
      },
      {
        id: 'm2',
        name: 'Poisson grillé, sauce vanille de Madagascar',
        nameEn: 'Grilled fish, Madagascar vanilla sauce',
        description: 'Poisson du jour, sauce vanille bourbon, légumes de saison',
        descriptionEn: 'Catch of the day, bourbon vanilla sauce, seasonal vegetables',
        price: 32000,
      },
      {
        id: 'm3',
        name: 'Filet de zébu au poivre sauvage',
        nameEn: 'Zebu filet with wild pepper',
        description: 'Poivre sauvage de Madagascar, gratin de pommes de terre',
        descriptionEn: 'Madagascar wild pepper, potato gratin',
        price: 35000,
      },
      {
        id: 'm4',
        name: 'Curry de crevettes au lait de coco',
        nameEn: 'Shrimp curry with coconut milk',
        description: 'Riz parfumé, brochette de légumes grillés',
        descriptionEn: 'Fragrant rice, grilled vegetable skewer',
        price: 34000,
      },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts',
    titleEn: 'Desserts',
    items: [
      {
        id: 'd1',
        name: 'Assiette de fruits tropicaux',
        nameEn: 'Tropical fruit plate',
        description: "Fruits frais du jardin de l'hôtel",
        descriptionEn: "Fresh fruits from the hotel's garden",
        price: 9000,
      },
      {
        id: 'd2',
        name: 'Mousse au chocolat et vanille de Madagascar',
        nameEn: 'Chocolate mousse with Madagascar vanilla',
        description: 'Chocolat noir 70%, éclats de vanille bourbon',
        descriptionEn: '70% dark chocolate, bourbon vanilla shavings',
        price: 12000,
      },
    ],
  },
  {
    id: 'drinks',
    title: 'Bar & Boissons',
    titleEn: 'Bar & Drinks',
    items: [
      {
        id: 'b1',
        name: 'Cocktail signature "La Colongette"',
        nameEn: '"La Colongette" signature cocktail',
        description: 'Rhum arrangé maison, fruits de la passion',
        descriptionEn: 'House-infused rum, passion fruit',
        price: 15000,
      },
      {
        id: 'b2',
        name: 'Jus frais naturel',
        nameEn: 'Fresh natural juice',
        description: 'Ananas, mangue ou fruit de la passion',
        descriptionEn: 'Pineapple, mango or passion fruit',
        price: 7000,
      },
      {
        id: 'b3',
        name: 'Sélection de vins',
        nameEn: 'Wine selection',
        description: 'Vins locaux et importés au verre ou en bouteille',
        descriptionEn: 'Local and imported wines by the glass or bottle',
        price: 18000,
      },
    ],
  },
]

export default menuSections
