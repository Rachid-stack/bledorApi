import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListCharcuterieComponent } from './list-charcuterie.component';

describe('ListCharcuterieComponent', () => {
  let component: ListCharcuterieComponent;
  let fixture: ComponentFixture<ListCharcuterieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCharcuterieComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListCharcuterieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
