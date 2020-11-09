import { IShop } from 'app/shared/model/shop.model';

export interface IProduct {
  id?: number;
  name?: string;
  thumbnailContentType?: string;
  thumbnail?: any;
  description?: string;
  price?: number;
  shop?: IShop;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public thumbnailContentType?: string,
    public thumbnail?: any,
    public description?: string,
    public price?: number,
    public shop?: IShop
  ) {}
}
