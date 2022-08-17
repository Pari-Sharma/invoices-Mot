import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUploadedInvoicesComponent } from './all-uploaded-invoices.component';

describe('AllUploadedInvoicesComponent', () => {
  let component: AllUploadedInvoicesComponent;
  let fixture: ComponentFixture<AllUploadedInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllUploadedInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUploadedInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
