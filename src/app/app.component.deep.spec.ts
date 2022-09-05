import { ComponentFixture, TestBed } from "@angular/core/testing";
import { APP_INITIALIZER, Directive, Input } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { By, DomSanitizer } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { firstValueFrom, of, tap } from "rxjs";

import { AnchorScrollerService, GlobalMessagesService, IPage } from "./shared";
import { AppComponent } from "./app.component";
import { initSVGInitializer } from "./app.module";
import { RouterTestingModule } from "@angular/router/testing";

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick () {
    this.navigatedTo = this.linkParams;
  }
}

function initTestingApp(globalMessageService: GlobalMessagesService) {
  return () => firstValueFrom( of([{
    id: 'A1B2C3K4L5',
    about: ['Lorem ipsum dolor sit amet consectetur adipisicing elit.'],
    about_text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate reprehenderit mollitia rerum veritatis? Iure magni quam dolorem sit velit? Officia eos nesciunt id? Optio rem voluptatibus pariatur quam aperiam adipisci.',
    basic_information: [{label: 'Lorem ipsum dolor', value: 'Lorem ipsum dolor'}],
    footer: 'Lorem ipsum dolor',
    rrss: [{icon: 'afg-gitlab', info: 'Lorem ipsum dolor', position: 1, url: 'http://www.google.es', color: 'primary'}],
    title: 'afiugud',
    work_experience: [{company: 'WebFG', info: ['Lorem ipsum dolor'], period: '2020-2022', position: 1}]
  }] as IPage[]).pipe( tap( resp => {
    globalMessageService.setPageData(resp);
  } ) ) );
}

describe('AppComponent Deep', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatTooltipModule,
        BrowserAnimationsModule,
        RouterTestingModule,
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
        { provide: AnchorScrollerService, useValue: { listen: () => {} } as AnchorScrollerService },
      ],
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });
  it( `should be change to contact if clicked in link`, () => {
    fixture.detectChanges();
    const routerLink = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub))[1]
      .injector.get(RouterLinkDirectiveStub);
    fixture.debugElement.query(By.css('a[href*="contact"')).triggerEventHandler('click', {});
    expect(routerLink.navigatedTo[0]).withContext('Click on contact must redirect to contact').toBe('/contact');
  } );

});
