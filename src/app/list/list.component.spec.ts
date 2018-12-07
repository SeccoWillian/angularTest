import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { isNumber, isArray } from 'util';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should be returned total of Elements', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(component.totalElements).toBe(isNumber);
  });

  it('Should be returned All of Elements', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(component.dataSource).toBe(isArray);
  });
});


