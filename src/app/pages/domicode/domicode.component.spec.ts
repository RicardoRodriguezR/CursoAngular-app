import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomicodeComponent } from './domicode.component';

describe('DomicodeComponent', () => {
  let component: DomicodeComponent;
  let fixture: ComponentFixture<DomicodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomicodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomicodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
