/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoyerComponent } from './loyer.component';

describe('LoyerComponent', () => {
  let component: LoyerComponent;
  let fixture: ComponentFixture<LoyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
