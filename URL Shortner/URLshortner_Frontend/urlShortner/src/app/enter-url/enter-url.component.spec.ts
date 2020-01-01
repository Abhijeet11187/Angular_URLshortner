import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterURLComponent } from './enter-url.component';

describe('EnterURLComponent', () => {
  let component: EnterURLComponent;
  let fixture: ComponentFixture<EnterURLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterURLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterURLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
