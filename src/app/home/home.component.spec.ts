import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import ENJSON from '../../assets/i18n/en.json';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let translate: TranslateService;
  let http; HttpTestingController;

  beforeEach(waitForAsync(() => {

    // TestBed configuration to run before each test
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (httpClient: HttpClient) => new TranslateHttpLoader(httpClient),
            deps: [HttpClient]
          }
        }),
      ],
      providers: [
        TranslateService
      ]
    })
    translate = TestBed.inject(TranslateService);
    http = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should translate a key', waitForAsync(() => {
    const translationResponse = 'System Performance';
    spyOn(translate, 'get').and.returnValue(of(translationResponse));
    translate.get('dashboard.nodePerformance.title').subscribe((res: string) => {
      console.log(res);
      expect(res).toEqual(translationResponse);
    });
  }));

  it('should expose "System Performance" in the title', waitForAsync(() => {
    const translationResponse = ENJSON.dashboard.nodePerformance.title;
    spyOn(translate, 'get').and.returnValue(of(translationResponse));
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    console.log(compiled.querySelector('.title'));
    expect(compiled.querySelector('.title').textContent).toContain('System Performance');
  }));
});


