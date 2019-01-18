import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdSelectComponent } from './md-select.component';

describe('MdSelectComponent', () => {
  let component: MdSelectComponent;
  let fixture: ComponentFixture<MdSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
