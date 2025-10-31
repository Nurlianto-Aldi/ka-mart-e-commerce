"use client"

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  }
}

const fetchData = async (): Promise<Product[] | undefined> => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if(!response.ok) {
      throw new Error("There's a problem with the response")
    }
    const data: Product[] = await response.json();
    return data
  } catch (error) {
    console.error(`Failed to do fetch operation : ${error}`)
    return undefined;
  }
}

const FakeStoreApi = () => {

  const [productList, setProductList] = useState<Product[] | undefined>(undefined);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchData()
      
      if(!data) {
        return undefined
      } else {
        setProductList(data)
      }

    }
    loadProduct()
  }, [])

  return (
    <div
      className="container mx-auto p-8"
    >
      <ul
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {productList?.map((product: Product) => (
          <li
            key={product.id}
          >
            <ProductCard productDetail={product} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FakeStoreApi;