import { Component, OnInit } from '@angular/core';
import { ShopService } from '../entities/shop/shop.service';
import { HttpResponse } from '@angular/common/http';
import { IShop } from '../shared/model/shop.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent implements OnInit {
  shops?: IShop[];

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
