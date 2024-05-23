import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewCardComponent } from './product-review-card.component';

describe('ProductReviewCardComponent', () => {
  let component: ProductReviewCardComponent;
  let fixture: ComponentFixture<ProductReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductReviewCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
