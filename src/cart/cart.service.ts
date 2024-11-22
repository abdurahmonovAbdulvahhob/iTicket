import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './models/cart.model';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart) private cartModel: typeof Cart){}
  create(createCartDto: CreateCartDto) {
    return this.cartModel.create(createCartDto);
  }

  findAll() {
    return this.cartModel.findAll({include: {all:true}});
  }

  findOne(id: number) {
    return this.cartModel.findOne({where:{id}});
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    const c = await this.cartModel.update(updateCartDto,{where: {id},returning: true})
    return c[1][0];
  }

  remove(id: number) {
    return this.cartModel.destroy({where: {id}});
  }
}
