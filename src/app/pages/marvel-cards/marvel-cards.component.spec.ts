import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarvelCardsComponent } from './marvel-cards.component';

describe('MarvelCardsComponent', () => {
  let component: MarvelCardsComponent;
  let fixture: ComponentFixture<MarvelCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarvelCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarvelCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
