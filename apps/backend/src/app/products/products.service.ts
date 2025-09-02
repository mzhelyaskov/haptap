import { SortDirection } from '@app/models/sort-direction';
import { CreateProductDto } from '@app/products/dto/create-product.dto';
import { ProductQueryParamsDto } from '@app/products/dto/product-query-params.dto';
import { ProductsSearchResponseDto } from '@app/products/dto/products-search-response.dto';
import { UpdateProductDto } from '@app/products/dto/update-product.dto';
import { Product } from '@app/products/entities/product.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {}

  getByParams$(params: ProductQueryParamsDto): Promise<ProductsSearchResponseDto> {
    const qb: SelectQueryBuilder<Product> = this.productRepo.createQueryBuilder('products');

    // Filter: minimum price
    if (params.minPrice !== undefined) {
      qb.andWhere('products.price >= :minPrice', { minPrice: params.minPrice });
    }

    // Filter: maximum price
    if (params.maxPrice !== undefined) {
      qb.andWhere('products.price <= :maxPrice', { maxPrice: params.maxPrice });
    }

    // Filter: minimum rating
    if (params.rating !== undefined) {
      qb.andWhere('products.rating >= :rating', { rating: params.rating });
    }

    // Filter: name search (case-insensitive)
    if (params.query) {
      qb.andWhere('LOWER(products.name) LIKE LOWER(:query)', { query: `%${ params.query }%` });
    }

    // Sorting
    if (params.sort) {
      for (const [property, direction] of Object.entries(params.sort)) {
        qb.addOrderBy(`products.${ property }`, direction);
      }
    } else {
      // Default sorting
      qb.addOrderBy('products.name', SortDirection.ASC);
    }

    // Pagination
    const itemsOffset: number = (params.page - 1) * params.limit;
    qb.skip(itemsOffset).take(params.limit);

    // Execute query and return response
    return qb.getManyAndCount().then(([items, total]: [Product[], number]) => {
      return {
        items,
        total,
        page: params.page,
        limit: params.limit,
        totalPages: Math.ceil(total / params.limit),
      };
    });
  }

  getProductWithComments$(productId: number): Promise<Product | null> {
    return this.productRepo.findOne({
      where: { id: productId },
      relations: ['comments'],
    });
  }

  async create$(dto: CreateProductDto): Promise<Product> {
    const product: Product = this.productRepo.create(dto);
    return this.productRepo.save(product);
  }

  async update$(id: number, dto: Partial<UpdateProductDto>): Promise<Product> {
    const product: Product | null = await this.getProductWithComments$(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    Object.assign(product, dto);
    return this.productRepo.save(product);
  }

  async remove$(id: number): Promise<void> {
    const product: Product | null = await this.getProductWithComments$(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepo.remove(product);
  }
}