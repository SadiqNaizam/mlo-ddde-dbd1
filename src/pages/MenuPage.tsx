import React from 'react';

// Import Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DishCard from '@/components/DishCard';
import AnimatedOnScrollWrapper from '@/components/AnimatedOnScrollWrapper';

// Import shadcn/ui Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Placeholder data for the menu, categorized for the Tabs component.
const dishes = [
  { 
    id: 1, 
    title: "Seared Scallops with Saffron Risotto", 
    description: "Perfectly seared sea scallops on a bed of creamy saffron-infused risotto.", 
    price: 28.50, 
    imageUrl: 'https://images.unsplash.com/photo-1623961918323-434ba2cea7b7?q=80&w=2560&auto=format&fit=crop', 
    category: 'Main Courses' 
  },
  { 
    id: 2, 
    title: "Wagyu Beef Burger", 
    description: "Juicy Wagyu beef patty with aged cheddar, caramelized onions, and truffle aioli on a brioche bun.", 
    price: 22.00, 
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2560&auto=format&fit=crop', 
    category: 'Main Courses'
  },
   { 
    id: 3, 
    title: "Mushroom & Truffle Pappardelle", 
    description: "Handmade pappardelle pasta tossed in a rich, creamy wild mushroom and black truffle sauce.", 
    price: 24.00, 
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e326e20f545c?q=80&w=2560&auto=format&fit=crop', 
    category: 'Main Courses'
  },
  { 
    id: 4, 
    title: "Crispy Calamari", 
    description: "Lightly breaded and fried calamari rings served with a spicy marinara dipping sauce.", 
    price: 14.50, 
    imageUrl: 'https://images.unsplash.com/photo-1547059556-30b3554445a5?q=80&w=2560&auto=format&fit=crop', 
    category: 'Appetizers' 
  },
  { 
    id: 5, 
    title: "Burrata with Heirloom Tomatoes", 
    description: "Creamy burrata cheese, vibrant heirloom tomatoes, fresh basil, and a balsamic glaze drizzle.", 
    price: 16.00, 
    imageUrl: 'https://images.unsplash.com/photo-1565599383342-9a73bdedb35f?q=80&w=2560&auto=format&fit=crop', 
    category: 'Appetizers'
  },
  { 
    id: 6, 
    title: "Molten Chocolate Lava Cake", 
    description: "Decadent dark chocolate cake with a gooey, molten center, served with raspberry coulis.", 
    price: 11.00, 
    imageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=2560&auto=format&fit=crop', 
    category: 'Desserts' 
  },
  { 
    id: 7, 
    title: "New York Cheesecake", 
    description: "Classic, rich, and creamy cheesecake with a graham cracker crust, topped with fresh berries.", 
    price: 9.50, 
    imageUrl: 'https://images.unsplash.com/photo-1534483502133-13d05d3999b2?q=80&w=2560&auto=format&fit=crop', 
    category: 'Desserts'
  },
  {
    id: 8,
    title: "Artisanal Lemonade",
    description: "Freshly squeezed lemonade infused with a hint of rosemary and sparkling water.",
    price: 6.50,
    imageUrl: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=2560&auto=format&fit=crop',
    category: 'Beverages'
  },
];

const categories = [...new Set(dishes.map(dish => dish.category))];

const MenuPage = () => {
  console.log('MenuPage loaded');

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="container py-12 md:py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground">
              Our Exquisite Menu
            </h1>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
              Explore our collection of dishes, crafted with the finest ingredients and culinary passion.
            </p>
          </div>

          <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mx-auto mb-10 h-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="py-2.5">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {dishes
                    .filter((dish) => dish.category === category)
                    .map((dish, index) => (
                      <AnimatedOnScrollWrapper 
                        key={dish.id} 
                        animationType="slideInUp"
                        delay={index * 0.1}
                        amount={0.2}
                      >
                        <DishCard
                          id={dish.id}
                          title={dish.title}
                          description={dish.description}
                          price={dish.price}
                          imageUrl={dish.imageUrl}
                        />
                      </AnimatedOnScrollWrapper>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MenuPage;