import { APP_INITIALIZER } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { firstValueFrom, of, tap } from 'rxjs';
import { AppComponent } from './app.component';
import { initSVGInitializer } from './app.module';
import { GlobalMessagesService, IPage } from './shared';

function initTestingApp(globalMessageService: GlobalMessagesService) {
  return () => firstValueFrom( of([{
    id: 'A1B2C3K4L5',
    about: ['Lorem ipsum dolor sit amet consectetur adipisicing elit.'],
    about_text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate reprehenderit mollitia rerum veritatis? Iure magni quam dolorem sit velit? Officia eos nesciunt id? Optio rem voluptatibus pariatur quam aperiam adipisci.',
    basic_information: [{label: 'Lorem ipsum dolor', value: 'Lorem ipsum dolor'}],
    footer: 'Lorem ipsum dolor',
    rrss: [{icon: 'afg-1', info: 'Lorem ipsum dolor', position: 1, url: 'http://www.google.es', color: 'primary'}],
    title: 'afiugud',
    work_experience: [{company: 'WebFG', info: ['Lorem ipsum dolor'], period: '2020-2022', position: 1}]
  }] as IPage[]).pipe( tap( resp => {
    globalMessageService.setPageData(resp);
  } ) ) );
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatTooltipModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: initTestingApp,
          deps: [GlobalMessagesService],
          multi: true
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initSVGInitializer,
          deps: [MatIconRegistry, DomSanitizer],
          multi: true
        },
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    fixture.detectChanges();
    expect(app.sidenav).toBeTruthy();
  });

  it(`should have 2 items in menu`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.sideNavItems).toHaveSize(2);
  });

  it('should render Name', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span.afg-name')?.textContent).toContain('afiugud');
  });
});
