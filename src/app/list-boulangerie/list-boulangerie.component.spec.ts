import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListBoulangerieComponent } from './list-boulangerie.component';

describe('ListBoulangerieComponent', () => {
  let component: ListBoulangerieComponent;
  let fixture: ComponentFixture<ListBoulangerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBoulangerieComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListBoulangerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
