import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface DishCardProps {
  id: string | number;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
}

const cardVariants = {
  rest: {
    y: 0,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    y: -8,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(255, 215, 0, 0.4)",
    transition: { duration: 0.3 }
  },
};

const buttonVariants = {
  rest: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.2 }
  },
  hover: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const DishCard: React.FC<DishCardProps> = ({ id, imageUrl, title, description, price }) => {
  console.log('DishCard loaded for:', title);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent card hover state from flickering
    toast.success(`${title} has been added to your cart.`);
    console.log(`Dish ${id} added to cart.`);
  };

  return (
    <motion.div
      className="cursor-pointer"
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <Card className="w-full h-full overflow-hidden bg-background border-border/40 flex flex-col">
        <CardHeader className="p-0 relative">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225.png?text=Culinary+Cloud'}
              alt={title}
              className="object-cover w-full h-full"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow space-y-2">
          <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </CardContent>
        <div className="p-4 pt-0 mt-auto flex justify-between items-center">
          <p className="text-lg font-bold text-primary">
            ${price.toFixed(2)}
          </p>
          <motion.div variants={buttonVariants}>
            <Button onClick={handleAddToCart} size="sm">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

export default DishCard;