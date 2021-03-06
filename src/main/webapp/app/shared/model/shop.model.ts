import { IProduct } from 'app/shared/model/product.model';
import { IUser } from 'app/core/user/user.model';

export interface IShop {
  id?: number;
  name?: string;
  logoContentType?: string;
  logo?: any;
  address?: string;
  email?: string;
  phone?: number;
  description?: string;
  products?: IProduct[];
  user?: IUser;
}

export class Shop implements IShop {
  constructor(
    public id?: number,
    public name?: string,
    public logoContentType?: string,
    public logo?: any,
    public address?: string,
    public email?: string,
    public phone?: number,
    public description?: string,
    public products?: IProduct[],
    public user?: IUser
  ) {}
}
