import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColeccionistaComponent } from './add-coleccionista.component';

describe('AddColeccionistaComponent', () => {
  let component: AddColeccionistaComponent;
  let fixture: ComponentFixture<AddColeccionistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddColeccionistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddColeccionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
