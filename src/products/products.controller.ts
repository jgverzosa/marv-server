import { Controller, Post, Body, Get, Param, Patch, Delete} from '@nestjs/common';

import { ProductsService } from './products.service';
import { title } from 'process';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * New product
   * @param prodTitle 
   * @param prodDesc 
   * @param prodPrice 
   */
  @Post()
  addProduct(
    @Body('title') prodTitle: string, 
    @Body('description') prodDesc: string, 
    @Body('price') prodPrice: number, 
  ) {
    const generatedId = this.productsService.insertProduct(
      prodTitle, 
      prodDesc, 
      prodPrice
      )
    return {id: generatedId}
  }

  /**
   * Get all product
   */
  @Get()
  getAllProducts() {
    return {data: this.productsService.getProducts()}
  }

  /**
   * Get single product
   * @param prodId 
   */
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId)
  }

  /**
   * Update product details
   * @param prodId 
   * @param prodTitle 
   * @param prodDesc 
   * @param prodPrice 
   */
  @Patch(':id')
  updateProduct( 
    @Param('id') prodId: string, 
    @Body('title') prodTitle: string, 
    @Body('description') prodDesc: string, 
    @Body('price') prodPrice: number, 
  ) {
    this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice)
    return null
  }

  /**
   * Remove product
   * @param prodId 
   */
  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    return this.productsService.removeProduct(prodId)
  }
}