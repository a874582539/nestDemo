import {Get, Post, Body, Put, Delete, Query, Param, Controller} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductsRO } from './product.interface';

import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiImplicitParam,
} from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from './dto';

@ApiBearerAuth()
@ApiUseTags('products')
@Controller('products')
export class ProductController {

  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ title: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.'})
  @Get()
  async findAll(@Query() query): Promise<ProductsRO> {
    return await this.productService.findAll(query);
  }

  @ApiOperation({ title: 'Create product' })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@Body() productData:CreateProductDto) {
    return this.productService.create(productData)
  }
  
  @ApiOperation({ title: 'Update product' })
  @ApiImplicitParam({name:'slug',type:'string',description:'project slug',required:true})
  @ApiResponse({ status: 201, description: 'The product has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':slug')
  async update(@Param() params:any, @Body() productData:UpdateProductDto) {
    console.log(productData)
    return this.productService.update(params.slug, productData) 
  }

  @ApiOperation({ title: 'Delete product' })
  @ApiImplicitParam({name:'slug',type:'string',description:'project slug',required:true})
  @ApiResponse({ status: 201, description: 'The product has been successfully deleted.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':slug')
  async delete(@Param() params) {
    return this.productService.delete(params.slug);
  }
}