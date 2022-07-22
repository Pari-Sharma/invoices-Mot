import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultAsideComponent } from './default-aside.component';

import { SidebarComponent, SidebarHeaderComponent } from '@coreui/angular-pro';

describe('DefaultAsideComponent', () => {
  let component: DefaultAsideComponent;
  let fixture: ComponentFixture<DefaultAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultAsideComponent, SidebarComponent, SidebarHeaderComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
