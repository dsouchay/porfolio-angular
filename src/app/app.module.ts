import { APP_INITIALIZER, Injectable, Injector, NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { GlobalMessagesService, PageInfoService, SVGS } from './shared';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, MatTooltipModule} from '@angular/material/tooltip';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { firstValueFrom, tap } from 'rxjs';
@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {

  constructor(
    private readonly title: Title,
    protected globaleMessageService: GlobalMessagesService
  ) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    const { 0: {title: base_title='No title'}={} } = this.globaleMessageService.getPageDataSynch() || [];
    if (title !== undefined) {
      this.title.setTitle(`${base_title} - ${title}`);
    }
  }
}
export function initFireBaseData( pageService: PageInfoService, globalMessageService: GlobalMessagesService ){
  return () => firstValueFrom( pageService.getPageInfo().pipe( tap( resp => {
    globalMessageService.setPageData(resp);
  } ) ) )
}
export function initSVGInitializer( iconRegistry: MatIconRegistry, sanitizer: DomSanitizer ){
  return () => new Promise<boolean>( ( resolve: (res: boolean) => void ) => {
    SVGS.forEach( item => {
      const { svg=undefined, name=undefined } = item as any || {};
      iconRegistry.addSvgIconLiteral(name, sanitizer.bypassSecurityTrustHtml(svg));
    });
    resolve(true);
  } )
}
/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000,
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initFireBaseData,
      deps: [PageInfoService, GlobalMessagesService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initSVGInitializer,
      deps: [MatIconRegistry, DomSanitizer],
      multi: true
    },
    {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults},
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy, deps: [Title, GlobalMessagesService]},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
