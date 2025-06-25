import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Icons
import { Trash2 } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Spicy Rigatoni alla Vodka',
    price: 24.50,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1598866594240-a_2ea6d34b4b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Truffle & Parmesan Fries',
    price: 12.00,
    quantity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1576402035165-ff553a1d6b05?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Burrata with Prosciutto',
    price: 18.00,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop',
  },
];

const CartPage = () => {
  console.log('CartPage loaded');
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const navigate = useNavigate();

  const handleQuantityChange = (id: number, quantity: number) => {
    const newQuantity = Math.max(1, quantity); // Ensure quantity is at least 1
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-8 sm:py-12">
        <Card className="w-full max-w-4xl mx-auto border-border/40 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">Your Cart</CardTitle>
          </CardHeader>
          <CardContent>
            {cartItems.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40%] sm:w-[50%]">Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Remove</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-16 h-16 rounded-md object-cover hidden sm:block"
                            />
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-center">
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            className="w-20 mx-auto text-center"
                            min="1"
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="h-5 w-5 text-muted-foreground" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">Your cart is empty.</p>
                <Button asChild>
                  <Link to="/menu">Continue Shopping</Link>
                </Button>
              </div>
            )}
          </CardContent>
          {cartItems.length > 0 && (
            <CardFooter className="flex flex-col sm:flex-row items-end justify-end gap-4 bg-muted/50 p-6">
                <div className="text-right">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p className="text-2xl font-bold">${subtotal.toFixed(2)}</p>
                </div>
                <Button size="lg" onClick={() => navigate('/checkout')}>
                    Proceed to Checkout
                </Button>
            </CardFooter>
          )}
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;