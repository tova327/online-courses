import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerAppLayoutComponent } from './inner-app-layout.component';

describe('InnerAppLayoutComponent', () => {
  let component: InnerAppLayoutComponent;
  let fixture: ComponentFixture<InnerAppLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnerAppLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerAppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
