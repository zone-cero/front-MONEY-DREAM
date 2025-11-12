"use client"

import React, { useState, useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter, X, Check, ChevronDown, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  color?: string;
}

const mockProducts: Product[] = [
  { id: "1", name: "Nike Air Max 2024", price: 129.99, image: "/nike-air-max-sneakers-white-blue.jpg", category: "Tenis", stock: 15, color: "White" },
  { id: "2", name: "Playera Premium Cotton", price: 29.99, image: "/premium-white-cotton-t-shirt.jpg", category: "Playeras", stock: 8, color: "White" },
  { id: "3", name: "Pantalón Deportivo Pro", price: 59.99, image: "/black-athletic-pants.jpg", category: "Pantalones", stock: 20, color: "Black" },
  { id: "4", name: "Adidas Ultraboost", price: 149.99, image: "/adidas-ultraboost-running-shoes.jpg", category: "Tenis", stock: 5, color: "Black" },
  { id: "5", name: "Playera Oversize Negra", price: 34.99, image: "/black-oversized-t-shirt.jpg", category: "Playeras", stock: 12, color: "Black" },
  { id: "6", name: "Jeans Slim Fit", price: 69.99, image: "/blue-slim-fit-jeans.jpg", category: "Pantalones", stock: 18, color: "Blue" },
  { id: "7", name: "Puma RS-X", price: 119.99, image: "/puma-rs-x-sneakers-colorful.jpg", category: "Tenis", stock: 7, color: "White" },
  { id: "8", name: "Playera Polo Clásica", price: 39.99, image: "/navy-blue-polo-shirt.jpg", category: "Playeras", stock: 25, color: "Blue" },
  { id: "9", name: "Pantalón Cargo", price: 64.99, image: "/khaki-cargo-pants.jpg", category: "Pantalones", stock: 14, color: "Gray" },
  { id: "10", name: "Converse Chuck Taylor", price: 79.99, image: "/converse-chuck-taylor-black.jpg", category: "Tenis", stock: 22, color: "Black" },
  { id: "11", name: "Playera Gráfica Vintage", price: 32.99, image: "/vintage-graphic-t-shirt.jpg", category: "Playeras", stock: 9, color: "Gray" },
  { id: "12", name: "Pantalón Chino", price: 54.99, image: "/beige-chino-pants.png", category: "Pantalones", stock: 16, color: "White" },
];

const allCategories = [...new Set(mockProducts.map(p => p.category))];
const allColors = [...new Set(mockProducts.map(p => p.color))];

// Utility para clases condicionales
const cn = (...classes: (string | false | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Componente ProductCard
const ProductCard = ({ product }: { product: Product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdded(true);
    toast.success("Producto añadido");
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div 
      className="group relative border border-gray-100 rounded-none overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-lime-200 cursor-pointer"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <div className="aspect-square relative bg-gray-50">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-100" />
        )}
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Quick add button */}
        <Button
          variant="ghost"
          className={cn(
            "absolute bottom-4 left-4 right-4 rounded-none text-sm font-medium transition-all duration-300",
            "bg-gray-900 text-white hover:bg-lime-400 hover:text-gray-900",
            "opacity-0 group-hover:opacity-100"
          )}
          size="sm"
          onClick={handleQuickAdd}
        >
          {isAdded ? (
            <><Check className="h-4 w-4 mr-2" /> Añadido</>
          ) : (
            <><ShoppingCart className="h-4 w-4 mr-2" /> Añadir</>
          )}
        </Button>
      </div>
      
      <div className="p-4 space-y-2">
        <p className="text-[11px] text-gray-500 uppercase tracking-[0.3em]">{product.category}</p>
        <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
        <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

// Componente FilterSection
const FilterSection = ({ title, options, selected, onSelect }: {
  title: string;
  options: string[];
  selected: string[];
  onSelect: (option: string) => void;
}) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  return (
    <div className="border-b border-gray-100 pb-6 mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full mb-4 text-left"
      >
        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
          {title}
        </h3>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="space-y-3">
          {options.map(option => (
            <label key={option} className="flex items-center cursor-pointer group">
              <div className="relative w-5 h-5 mr-3">
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => onSelect(option)}
                  className="sr-only"
                />
                <div className={cn(
                  "w-full h-full border transition-all duration-200 rounded-none flex items-center justify-center",
                  selected.includes(option)
                    ? 'border-lime-400 bg-lime-50'
                    : 'border-gray-300 group-hover:border-lime-400'
                )}>
                  {selected.includes(option) && (
                    <Check className="h-3 w-3 text-lime-500" />
                  )}
                </div>
              </div>
              <span className={cn(
                "text-sm transition-colors duration-200",
                selected.includes(option) ? 'text-gray-900 font-medium' : 'text-gray-500 group-hover:text-gray-700'
              )}>
                {option}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

// Componente PriceFilter
const PriceFilter = ({ priceRange, onPriceChange }: {
  priceRange: number;
  onPriceChange: (value: number) => void;
}) => {
  return (
    <div className="border-b border-gray-100 pb-6 mb-6">
      <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
        Precio
      </h3>
      <div className="space-y-4">
        <input
          type="range"
          min="0"
          max="200"
          step="10"
          value={priceRange}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full h-0.5 bg-gray-200 cursor-pointer appearance-none accent-lime-400"
        />
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">$0</span>
          <span className="text-gray-900 font-semibold">${priceRange.toFixed(0)}</span>
        </div>
      </div>
    </div>
  );
};

export default function CatalogPage() {
  const isMobile = useIsMobile();
  const router = useRouter();
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(200);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(p => 
      (selectedCategories.length === 0 || selectedCategories.includes(p.category)) &&
      (selectedColors.length === 0 || selectedColors.includes(p.color)) &&
      (p.price <= priceRange)
    );
  }, [selectedCategories, selectedColors, priceRange]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setPriceRange(200);
    toast.info("Filtros limpiados");
  };

  const activeFiltersCount = selectedCategories.length + selectedColors.length + (priceRange < 200 ? 1 : 0);

  // Contenido del sidebar/filtros
  const FilterContent = (
    <>
      <FilterSection
        title="Categoría"
        options={allCategories}
        selected={selectedCategories}
        onSelect={(cat) => setSelectedCategories(prev => 
          prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        )}
      />
      
      <FilterSection
        title="Color"
        options={allColors}
        selected={selectedColors}
        onSelect={(color) => setSelectedColors(prev => 
          prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
        )}
      />
      
      <PriceFilter
        priceRange={priceRange}
        onPriceChange={setPriceRange}
      />
      
      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          onClick={clearFilters}
          className="w-full mt-6 rounded-none border border-gray-300 hover:border-lime-400 text-sm font-medium transition-all duration-200 hover:bg-lime-50"
        >
          Limpiar {activeFiltersCount} filtro{activeFiltersCount > 1 ? 's' : ''}
        </Button>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-white">
      
	  <Header/>
	    <main className="max-w-full mx-auto pt-48"> {/* max-w-full y pt-6 movidos aquí */}

            {/* BREADCRUMB - Dentro de main, con su propio contenedor de ancho y padding */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button onClick={() => router.push("/")} className="hover:text-gray-900 transition-colors">
                    Inicio
                </button>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 font-medium">Colección</span>
            </nav>

            
            {/* CONTENIDO DE LA COLECCIÓN (FILTROS Y PRODUCTOS) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
                    {/* Desktop Sidebar - Sticky con top-32 para alinearse con el header */}
                    {!isMobile && (
                        <div className="lg:col-span-1">
                            <div className="sticky top-32">
                                {FilterContent}
                            </div>
                        </div>
                    )}

                    {/* Product Grid */}
                    <div className="lg:col-span-3">
                        <div className="mb-8 flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold text-gray-900">{filteredProducts.length}</span> productos
                            </p>
                            
                            <select className="text-sm border-0 border-b border-gray-200 rounded-none focus:ring-0 focus:border-lime-400 pb-1">
                                <option>Destacados</option>
                                <option>Menor precio</option>
                                <option>Mayor precio</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="col-span-full text-center py-20">
                                <p className="text-gray-500 mb-4">No hay productos que coincidan</p>
                                <Button onClick={clearFilters} variant="outline" className="rounded-none border-gray-300 hover:border-lime-400 hover:bg-lime-50">
                                    Limpiar filtros
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
        </main>
		<Footer/>
    </div>
  );
}