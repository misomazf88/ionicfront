import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAlbumComponent } from './filter-album.component';

describe('FilterAlbumComponent', () => {
  let component: FilterAlbumComponent;
  let fixture: ComponentFixture<FilterAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterAlbumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
