import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcctDetailComponent } from './acct-detail.component';

describe('AcctDetailComponent', () => {
  let component: AcctDetailComponent;
  let fixture: ComponentFixture<AcctDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcctDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcctDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
