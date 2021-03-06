import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputTableComponent } from './output-table.component';

describe('OutputTableComponent', () => {
  let component: OutputTableComponent;
  let fixture: ComponentFixture<OutputTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutputTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUsers when the component is loaded', () => {
    const fnc = spyOn(component, 'getUsers');

    component.ngOnInit();

    expect(fnc).toHaveBeenCalled();
  });
});
