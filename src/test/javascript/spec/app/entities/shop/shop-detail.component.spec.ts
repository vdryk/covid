import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { CovidTestModule } from '../../../test.module';
import { ShopDetailComponent } from 'app/entities/shop/shop-detail.component';
import { Shop } from 'app/shared/model/shop.model';

describe('Component Tests', () => {
  describe('Shop Management Detail Component', () => {
    let comp: ShopDetailComponent;
    let fixture: ComponentFixture<ShopDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ shop: new Shop(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CovidTestModule],
        declarations: [ShopDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ShopDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ShopDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load shop on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.shop).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
