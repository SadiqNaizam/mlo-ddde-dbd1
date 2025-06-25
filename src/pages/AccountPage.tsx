import React, { useState } from 'react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const AccountPage = () => {
  console.log('AccountPage loaded');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Jane Doe");

  // Mock order data
  const orders = [
    {
      id: "ORD001",
      date: "2023-10-26",
      status: "Delivered",
      total: 45.50,
    },
    {
      id: "ORD002",
      date: "2023-10-28",
      status: "Delivered",
      total: 22.00,
    },
    {
      id: "ORD003",
      date: "2023-11-05",
      status: "Processing",
      total: 89.99,
    },
  ];
  
  // Handler for form submission to prevent page reload and simulate login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };


  const LoggedOutView = () => (
    <Tabs defaultValue="login" className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">Login</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>
              Join us to start your premium dining experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name-reg">Name</Label>
                        <Input id="name-reg" type="text" placeholder="Jane Doe" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email-reg">Email</Label>
                        <Input id="email-reg" type="email" placeholder="jane@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password-reg">Password</Label>
                        <Input id="password-reg" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">Create Account</Button>
                </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );

  const LoggedInView = () => (
    <div className="w-full max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome, {userName}!</h1>
        <Button onClick={handleLogout} variant="outline">Logout</Button>
      </div>
      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="history">Order History</TabsTrigger>
          <TabsTrigger value="address">Manage Address</TabsTrigger>
        </TabsList>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Your Orders</CardTitle>
              <CardDescription>A list of your past and current orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Badge variant={order.status === 'Delivered' ? 'secondary' : 'default'}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="address">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Address</CardTitle>
              <CardDescription>Manage your primary delivery address.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="address-line1">Address Line 1</Label>
                            <Input id="address-line1" defaultValue="123 Gastronomy Lane" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" defaultValue="Flavor Town" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="zip">ZIP Code</Label>
                                <Input id="zip" defaultValue="90210" />
                            </div>
                        </div>
                        <Button type="submit" className="mt-2">Save Address</Button>
                    </div>
                </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-background">
        <div className="container mx-auto px-4 py-12 md:py-20 flex justify-center items-start">
          {isLoggedIn ? <LoggedInView /> : <LoggedOutView />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;