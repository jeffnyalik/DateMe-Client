import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberListsComponent } from './member-lists.component';

describe('MemberListsComponent', () => {
  let component: MemberListsComponent;
  let fixture: ComponentFixture<MemberListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
