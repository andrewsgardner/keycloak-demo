import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenVisComponent } from './token-vis.component';

describe('TokenVisComponent', () => {
  let component: TokenVisComponent;
  let fixture: ComponentFixture<TokenVisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TokenVisComponent]
    });
    fixture = TestBed.createComponent(TokenVisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
