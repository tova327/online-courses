import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetinComponent } from './getin.component';

describe('GetinComponent', () => {
  let component: GetinComponent;
  let fixture: ComponentFixture<GetinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
