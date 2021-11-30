import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeleteConfirmingComponent } from './user-delete-confirming.component';

describe('UserDeleteConfirmingComponent', () => {
  let component: UserDeleteConfirmingComponent;
  let fixture: ComponentFixture<UserDeleteConfirmingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDeleteConfirmingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeleteConfirmingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
