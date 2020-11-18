import { Component, OnInit } from '@angular/core';
import { ShopService } from '../entities/shop/shop.service';
import { HttpResponse } from '@angular/common/http';
import { IShop } from '../shared/model/shop.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IProduct } from 'app/shared/model/product.model';

@UntilDestroy()
@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent implements OnInit {
  shops?: IShop[];

  products?: IProduct[] = [
    {
      id: 1,
      name: 'Puma 6.1 Netfit',
      thumbnail:
        'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/106179/01/sv01/fnd/EEA/fmt/png/Chaussures-de-football-Future-6.1-NETFIT-FG/AG',
      thumbnailContentType: 'type',
      description: 'Donnez à votre jeu tout ce dont il a besoin pour passer à la vitesse supérieure...',
      price: 199.99,
      shop: {
        id: 1,
        name: 'Puma',
      },
    },
    {
      id: 2,
      name: 'Blouson en cuir Rovio - S.C. Collection, noir',
      thumbnail: 'https://strellson.com/medias/sys_master/root/h99/he2/9479447478302/9479447478302.jpg',
      thumbnailContentType: 'type',
      description: 'Un modèle qui confère une touche originale à tous les looks : le blouson en cuir Rovio de la S.C.',
      price: 699.99,
      shop: {
        id: 2,
        name: 'Diesel',
      },
    },
    {
      id: 2,
      name: 'Jean Slim D-Strukt 00SPW4-5-009EI Bleu',
      thumbnail:
        'https://assets.laboutiqueofficielle.com/w_1100,q_auto,f_auto/media/products/2020/06/09/diesel_221953_00SPW4-5-009EI_01_20200618T152855_01.jpg',
      thumbnailContentType: 'type',
      description: 'Nouvelle Collection Diesel 2020',
      price: 199.99,
      shop: {
        id: 2,
        name: 'Diesel',
      },
    },
  ];

  constructor(protected shopService: ShopService) {}

  loadShops(): void {
    this.shopService
      .query()
      .pipe(untilDestroyed(this))
      .subscribe((res: HttpResponse<IShop[]>) => (this.shops = res.body || []));
  }

  ngOnInit(): void {
    this.shopService
      .query()
      .pipe(untilDestroyed(this))
      .subscribe((res: HttpResponse<IShop[]>) => (this.shops = res.body || []));
  }

  trackId(index: number, item: IShop): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }
}
