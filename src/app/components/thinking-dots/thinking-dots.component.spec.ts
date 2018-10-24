import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThinkingDotsComponent } from './thinking-dots.component';

describe('ThinkingDotsComponent', () => {
  let component: ThinkingDotsComponent;
  let fixture: ComponentFixture<ThinkingDotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThinkingDotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThinkingDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
