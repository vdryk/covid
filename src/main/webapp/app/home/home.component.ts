import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { ShopService } from '../entities/shop/shop.service';
import { HttpResponse } from '@angular/common/http';
import { IShop } from '../shared/model/shop.model';
import { ParentComponent } from 'app/shared/parent/parent.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent extends ParentComponent implements OnInit {
  shops?: IShop[];

  constructor(protected shopService: ShopService) {
    super();
  }

  loadShops(): void {
    this.shopService
      .query()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<IShop[]>) => (this.shops = res.body || []));
  }

  ngOnInit(): void {
    this.shopService
      .query()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<IShop[]>) => (this.shops = res.body || []));
  }

  trackId(index: number, item: IShop): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }
}
