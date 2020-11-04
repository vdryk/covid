import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'shop',
        loadChildren: () => import('./shop/shop.module').then(m => m.CovidShopModule),
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.CovidProductModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class CovidEntityModule {}
