import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogTopicComponent } from './backlog-topic.component';

describe('BacklogTopicComponent', () => {
  let component: BacklogTopicComponent;
  let fixture: ComponentFixture<BacklogTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BacklogTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
