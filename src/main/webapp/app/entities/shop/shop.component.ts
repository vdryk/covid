import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IShop } from 'app/shared/model/shop.model';
import { ShopService } from './shop.service';
import { ShopDeleteDialogComponent } from './shop-delete-dialog.component';

@Component({
  selector: 'jhi-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit, OnDestroy {
  shops?: IShop[];
  eventSubscriber?: Subscription;

  constructor(
    protected shopService: ShopService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.shopService.query().subscribe((res: HttpResponse<IShop[]>) => (this.shops = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInShops();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IShop): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInShops(): void {
    this.eventSubscriber = this.eventManager.subscribe('shopListModification', () => this.loadAll());
  }

  delete(shop: IShop): void {
    const modalRef = this.modalService.open(ShopDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.shop = shop;
  }
}
