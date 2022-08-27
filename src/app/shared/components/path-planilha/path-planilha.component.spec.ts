import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathPlanilhaComponent } from './path-planilha.component';

describe('PathPlanilhaComponent', () => {
  let component: PathPlanilhaComponent;
  let fixture: ComponentFixture<PathPlanilhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathPlanilhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathPlanilhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
