import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalShotsComponent } from './total-shots.component';

describe('TotalShotsComponent', () => {
  let component: TotalShotsComponent;
  let fixture: ComponentFixture<TotalShotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalShotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalShotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
