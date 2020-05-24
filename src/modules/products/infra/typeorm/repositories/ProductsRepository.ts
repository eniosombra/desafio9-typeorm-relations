/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      price,
      quantity,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const recordFound = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return recordFound;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const recordsFound = await this.ormRepository.findByIds(products);

    return recordsFound;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    for (const product of products) {
      const prodQuantity =
        (await this.ormRepository.findOne(product.id))?.quantity || 0;
      await this.ormRepository.save({
        ...product,
        quantity: prodQuantity - product.quantity,
      });
    }

    const prods = await this.findAllById(products);

    return prods;
  }
}

export default ProductsRepository;
