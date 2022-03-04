import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListGlacierComponent } from './list-glacier.component';

describe('ListGlacierComponent', () => {
  let component: ListGlacierComponent;
  let fixture: ComponentFixture<ListGlacierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGlacierComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListGlacierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
