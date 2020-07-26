import { Injectable, NotFoundException } from "@nestjs/common";

import { Product } from "./product.model"
import { title } from "process";

@Injectable()
export class ProductsService {
  private products: Product[] = []

  /**
   * New Product
   * @param title 
   * @param description 
   * @param price 
   */
  insertProduct(title: string, description: string, price: number) {
    const prodId = Math.random().toString()
    const newProduct = new Product(prodId, title, description, price)
    this.products.push(newProduct)
    return prodId;
  }

  /**
   * All Products
   */
  getProducts() {
    return [...this.products]
  }

  /**
   * Single Product
   * @param prodId 
   */
  getSingleProduct(prodId: string) {
    const [product, index] = this.findProduct(prodId)
    return {...product}
  }

  /**
   * Update Product
   * @param prodId 
   * @param title 
   * @param description 
   * @param price 
   */
  updateProduct(prodId: string, title: string, description: string, price: number) {
    const [product, index] = this.findProduct(prodId)
    const updatedProduct = {...product}
    if (title) {
      updatedProduct.title = title
    }
    if (description) {
      updatedProduct.description = description
    }
    if (price) {
      updatedProduct.price = price
    }
    this.products[index] = updatedProduct
    return this.products[index]
  }

  /**
   * Remove Product
   * @param prodId 
   */
  removeProduct(prodId: string) {
    const index = this.findProduct(prodId)[1]
    this.products.splice(index)
    return null
  }

  /**
   * Find product
   * @param id 
   */
  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id)
    const product = this.products[productIndex]
    if (!product) {
      throw new NotFoundException('Could not find product ')
    }
    return [product, productIndex];
  }
}