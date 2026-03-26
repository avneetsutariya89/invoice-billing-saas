"use client";

import { useState } from "react";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreHorizontal,
  DollarSign,
  Box,
  Settings,
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  category: string;
  unitPrice: number;
  taxRate: number;
  stockQuantity: number;
  lowStockThreshold: number;
  status: "active" | "inactive" | "discontinued";
  createdAt: string;
  updatedAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Web Development Service",
      description: "Custom website development and design services",
      sku: "WEB-001",
      category: "Services",
      unitPrice: 75,
      taxRate: 10,
      stockQuantity: 999,
      lowStockThreshold: 10,
      status: "active",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
    {
      id: "2",
      name: "UI/UX Design Package",
      description: "Complete user interface and user experience design",
      sku: "DESIGN-001",
      category: "Services",
      unitPrice: 50,
      taxRate: 10,
      stockQuantity: 999,
      lowStockThreshold: 10,
      status: "active",
      createdAt: "2024-01-20",
      updatedAt: "2024-01-20",
    },
    {
      id: "3",
      name: "SEO Optimization",
      description: "Search engine optimization and marketing services",
      sku: "SEO-001",
      category: "Marketing",
      unitPrice: 100,
      taxRate: 10,
      stockQuantity: 999,
      lowStockThreshold: 10,
      status: "active",
      createdAt: "2024-01-25",
      updatedAt: "2024-01-25",
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    sku: "",
    category: "",
    unitPrice: 0,
    taxRate: 10,
    stockQuantity: 0,
    lowStockThreshold: 10,
    status: "active" as const,
  });

  const categories = ["Services", "Products", "Marketing", "Consulting", "Support"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const createProduct = () => {
    const product: Product = {
      id: Date.now().toString(),
      ...newProduct,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setProducts([...products, product]);
    setIsCreateDialogOpen(false);
    setNewProduct({
      name: "",
      description: "",
      sku: "",
      category: "",
      unitPrice: 0,
      taxRate: 10,
      stockQuantity: 0,
      lowStockThreshold: 10,
      status: "active",
    });
  };

  const updateProduct = () => {
    if (!selectedProduct) return;
    
    setProducts(products.map(product =>
      product.id === selectedProduct.id 
        ? { ...selectedProduct, updatedAt: new Date().toISOString().split("T")[0] }
        : product
    ));
    setIsEditDialogOpen(false);
    setSelectedProduct(null);
  };

  const deleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const startEditProduct = (product: Product) => {
    setSelectedProduct({ ...product });
    setIsEditDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
      case "discontinued":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStockStatus = (stock: number, threshold: number) => {
    if (stock === 999) return { text: "Service", color: "text-blue-600" };
    if (stock <= threshold) return { text: "Low Stock", color: "text-red-600" };
    return { text: "In Stock", color: "text-green-600" };
  };

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Products & Services
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your product catalog and service offerings
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Product/Service</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, sku: e.target.value }))}
                      placeholder="Enter SKU (optional)"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter product description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={newProduct.category} onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={newProduct.status} onValueChange={(value: any) => setNewProduct(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="discontinued">Discontinued</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="unitPrice">Unit Price ($) *</Label>
                    <Input
                      id="unitPrice"
                      type="number"
                      step="0.01"
                      value={newProduct.unitPrice}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, unitPrice: parseFloat(e.target.value) || 0 }))}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      step="0.1"
                      value={newProduct.taxRate}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, taxRate: parseFloat(e.target.value) || 0 }))}
                      placeholder="10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stockQuantity">Stock Quantity</Label>
                    <Input
                      id="stockQuantity"
                      type="number"
                      value={newProduct.stockQuantity}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, stockQuantity: parseInt(e.target.value) || 0 }))}
                      placeholder="0 (use 999 for services)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lowStockThreshold">Low Stock Alert</Label>
                    <Input
                      id="lowStockThreshold"
                      type="number"
                      value={newProduct.lowStockThreshold}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, lowStockThreshold: parseInt(e.target.value) || 0 }))}
                      placeholder="10"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createProduct} className="bg-indigo-600 hover:bg-indigo-700">
                    Add Product
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mr-4">
                  <Package className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4">
                  <Box className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Products</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {products.filter(p => p.status === "active").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                  <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg. Price</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${products.length > 0 ? (products.reduce((sum, p) => sum + p.unitPrice, 0) / products.length).toFixed(0) : "0"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mr-4">
                  <Settings className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Low Stock</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {products.filter(p => p.stockQuantity <= p.lowStockThreshold && p.stockQuantity !== 999).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Products & Services</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stockQuantity, product.lowStockThreshold);
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          {product.sku && (
                            <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                          )}
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {product.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                          {product.category}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${product.unitPrice.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className={`text-sm font-medium ${stockStatus.color}`}>
                          {stockStatus.text}
                        </div>
                        {product.stockQuantity !== 999 && (
                          <div className="text-xs text-gray-500">
                            {product.stockQuantity} units
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                          {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => startEditProduct(product)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteProduct(product.id)} className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Product Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Product/Service</DialogTitle>
            </DialogHeader>
            {selectedProduct && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Product Name *</Label>
                    <Input
                      id="edit-name"
                      value={selectedProduct.name}
                      onChange={(e) => setSelectedProduct(prev => prev ? { ...prev, name: e.target.value } : null)}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-sku">SKU</Label>
                    <Input
                      id="edit-sku"
                      value={selectedProduct.sku}
                      onChange={(e) => setSelectedProduct(prev => prev ? { ...prev, sku: e.target.value } : null)}
                      placeholder="Enter SKU (optional)"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description *</Label>
                  <Textarea
                    id="edit-description"
                    value={selectedProduct.description}
                    onChange={(e) => setSelectedProduct(prev => prev ? { ...prev, description: e.target.value } : null)}
                    placeholder="Enter product description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-category">Category *</Label>
                    <Select 
                      value={selectedProduct.category} 
                      onValueChange={(value) => setSelectedProduct(prev => prev ? { ...prev, category: value } : null)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select 
                      value={selectedProduct.status} 
                      onValueChange={(value: any) => setSelectedProduct(prev => prev ? { ...prev, status: value } : null)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="discontinued">Discontinued</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-unitPrice">Unit Price ($) *</Label>
                    <Input
                      id="edit-unitPrice"
                      type="number"
                      step="0.01"
                      value={selectedProduct.unitPrice}
                      onChange={(e) => setSelectedProduct(prev => prev ? { ...prev, unitPrice: parseFloat(e.target.value) || 0 } : null)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-taxRate">Tax Rate (%)</Label>
                    <Input
                      id="edit-taxRate"
                      type="number"
                      step="0.1"
                      value={selectedProduct.taxRate}
                      onChange={(e) => setSelectedProduct(prev => prev ? { ...prev, taxRate: parseFloat(e.target.value) || 0 } : null)}
                      placeholder="10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-stockQuantity">Stock Quantity</Label>
                    <Input
                      id="edit-stockQuantity"
                      type="number"
                      value={selectedProduct.stockQuantity}
                      onChange={(e) => setSelectedProduct(prev => prev ? { ...prev, stockQuantity: parseInt(e.target.value) || 0 } : null)}
                      placeholder="0 (use 999 for services)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-lowStockThreshold">Low Stock Alert</Label>
                    <Input
                      id="edit-lowStockThreshold"
                      type="number"
                      value={selectedProduct.lowStockThreshold}
                      onChange={(e) => setSelectedProduct(prev => prev ? { ...prev, lowStockThreshold: parseInt(e.target.value) || 0 } : null)}
                      placeholder="10"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={updateProduct} className="bg-indigo-600 hover:bg-indigo-700">
                    Update Product
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </LayoutWrapper>
  );
}
