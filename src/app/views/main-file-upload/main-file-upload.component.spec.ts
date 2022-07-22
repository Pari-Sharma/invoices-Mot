import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFileUploadComponent } from './main-file-upload.component';

describe('MainFileUploadComponent', () => {
  let component: MainFileUploadComponent;
  let fixture: ComponentFixture<MainFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainFileUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
