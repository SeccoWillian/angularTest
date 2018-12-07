import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { isArray } from 'util';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return data array', () => {
    expect(component).toBeTruthy();
    expect(component.maximum).toBe(isArray);
    expect(component.minimum).toBe(isArray);
    expect(component.multWin).toBe(isArray);
    expect(component.search).toBe(isArray);
    expect(component.topTree).toBe(isArray);
    expect(component.winYear).toBe(isArray);
  });
});
