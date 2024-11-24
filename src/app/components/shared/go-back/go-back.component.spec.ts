import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoBackComponent } from './go-back.component';
import { provideRouter } from '@angular/router';

describe('GoBackComponent', () => {
  let component: GoBackComponent;
  let fixture: ComponentFixture<GoBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoBackComponent],
      providers: [
        provideRouter([])
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
