import {ProductsListComponent} from '@app/product/products-list/products-list.component';
import {product, MockProductService} from '@shared/mock-services/mock-products.services';
import {async, TestBed, ComponentFixture} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';

import {CommonService} from '@shared/services/common.service';
import {SharedModule} from '@shared/modules/shared.module';
import {AppMaterialModule} from '@shared/modules/app-material.module';
import {ProductModule} from '@app/product/product.module';
import {ProductsService} from '@shared/services/products.service';
import { RouterModule} from '@angular/router';
import {ProductComponent} from '@app/product/product.component';
import {ProductDetailComponent} from '@app/product/product-detail/product-detail.component';
import {AppModule} from '@app/app.module';

describe('ProductsListComponent', () => {
  let component: any;
  let fixture: ComponentFixture<ProductsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        AppMaterialModule,
        RouterModule,
        SharedModule,
        ProductModule,
        AppModule,
        RouterTestingModule.withRoutes([
          {
            path: 'products', component: ProductComponent, children: [
              {path: '', component: ProductsListComponent},
              {path: ':id', component: ProductDetailComponent},
            ],
          }
        ])
      ],
      providers: [
        {provide: CommonService, useClass: CommonService},
        {provide: ProductsService, useClass: MockProductService},
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ProductsListComponent);
      component = fixture.debugElement.componentInstance;
      component.ngOnInit();
    });

  }));

  it('Should create ProductsListComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ngOnInit method', () => {
    it('Should call getGoods method.', async(() => {
      const spy = spyOn(component.productsService, 'getGoods');
      component.ngOnInit();
      expect(spy).toHaveBeenCalledWith();
    }));
  });

  describe('ShowProductDescription method', () => {
    it ('Should relocate to product/:id', async(() => {
      const spy = spyOn(component.router, 'navigate');
      component.showProductDescription(product);
      expect(spy).toHaveBeenCalledWith([product.id], {relativeTo: component.activeRoute});
    }));
  });

  it('Check passing data to addToBasket', async(() => {
    const spy = spyOn(component.productsService, 'addToBasket');
    component.addToCart(123);
    expect(spy).toHaveBeenCalledWith(123);
  }));
});
