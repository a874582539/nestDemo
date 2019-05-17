import { Test } from '@nestjs/testing'
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { ProductsRO, ProductRO } from './product.interface';

describe('ProductController',()=>{
  let productController: ProductController
  let productService: ProductService

  beforeEach(async ()=>{
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ProductEntity])],
      controllers:[ProductController],
      providers:[ProductService]
    }).compile()

    productController = module.get<ProductController>(ProductController)
    productService = module.get<ProductService>(ProductService)
  })

  describe('findAll',()=>{
    it('should return products info',async ()=>{
      const data = {
        products:[
          
        ],
        productsCount:1
      }
      const result:Promise<ProductsRO> = Promise.resolve(data)
      jest.spyOn(productService, 'findAll').mockImplementation(()=>result)
      expect(await productController.findAll(undefined)).toBe(await result)
    })
  })
  //error with database connect
//   describe('create',()=>{
//     it('should return the created product info',async ()=>{
//       const data = {
//           id:1,
//           slug:'hehe',
//           description:'hsfasd',
//           name:'hehe',
//           created:new Date(),
//           updateTimestamp:void 0,
//           updated:new Date()
//       }
//       const result:Promise<ProductEntity> = Promise.resolve(data)
//       jest.spyOn(productService, 'create').mockImplementation(()=>result)
//       expect(await productController.create(undefined)).toBe(await result)
//     })
//   })
})