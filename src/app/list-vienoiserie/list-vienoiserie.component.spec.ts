import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListVienoiserieComponent } from './list-vienoiserie.component';

describe('ListVienoiserieComponent', () => {
  let component: ListVienoiserieComponent;
  let fixture: ComponentFixture<ListVienoiserieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVienoiserieComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListVienoiserieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
