import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ParallaxHeroSection from '@/components/ParallaxHeroSection';
import DishCard from '@/components/DishCard';
import AnimatedOnScrollWrapper from '@/components/AnimatedOnScrollWrapper';

// shadcn/ui Components
import { Button } from '@/components/ui/button';

// Placeholder data for featured dishes
const featuredDishes = [
  {
    id: 'dish-1',
    title: 'Truffle Risotto',
    description: 'Creamy Arborio rice with black truffle, wild mushrooms, and a touch of Parmesan cheese.',
    price: 28.50,
    imageUrl: 'https://images.unsplash.com/photo-1595908129363-c5f915712e03?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'dish-2',
    title: 'Seared Scallops',
    description: 'Perfectly seared scallops served on a bed of saffron cauliflower puree with a citrus glaze.',
    price: 34.00,
    imageUrl: 'https://images.unsplash.com/photo-1625869225722-2b12394f4d2f?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'dish-3',
    title: 'Wagyu Steak Frites',
    description: 'A5 Wagyu steak grilled to perfection, served with hand-cut fries and a béarnaise sauce.',
    price: 52.75,
    imageUrl: 'https://images.unsplash.com/photo-1551028150-64b9f398f67b?q=80&w=2070&auto=format&fit=crop',
  }
];

const Homepage = () => {
  console.log('Homepage loaded');

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <ParallaxHeroSection />

        {/* Featured Dishes Section */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedOnScrollWrapper animationType="slideInUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Featured Creations</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                  A glimpse into the artistry and flavors that define Culinary Cloud.
                </p>
              </div>
            </AnimatedOnScrollWrapper>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDishes.map((dish, index) => (
                <AnimatedOnScrollWrapper key={dish.id} animationType="slideInUp" delay={index * 0.1}>
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

            <AnimatedOnScrollWrapper animationType="fadeIn" delay={0.4}>
              <div className="mt-16 text-center">
                <Button asChild size="lg" className="font-semibold text-base">
                  <Link to="/menu">Explore The Full Menu</Link>
                </Button>
              </div>
            </AnimatedOnScrollWrapper>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;