import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SelectorPageComponent } from 'src/app/paises/pages/selector-page/selector-page.component';

describe('SelectorPageComponent', () => {
  let component: SelectorPageComponent;
  let fixture: ComponentFixture<SelectorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, HttpClientTestingModule
      ],
      declarations: [ SelectorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
