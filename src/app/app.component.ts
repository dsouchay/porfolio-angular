import { Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AnchorScrollerService, GlobalMessagesService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  sideNavItems: {label: string; path: string;}[] = [{label: 'Home', path: '/'}, {label: 'Contact', path: '/contact'}];
  selected: string = '';
  vT$ = {
    footer: {
      date: new Date()
    },
    title: new BehaviorSubject(undefined),
    footer_text: new BehaviorSubject(undefined),
    rrss: new BehaviorSubject(undefined)


  };
  @ViewChild('sidenav', {read:  MatSidenav}) sidenav:  MatSidenav;
  protected _unsubscribe: Subject<boolean> = new Subject();
  protected globalMessageService: GlobalMessagesService;
  protected anchorScrollerService: AnchorScrollerService;
  constructor(
    protected injector: Injector
  ){
    this.globalMessageService = injector.get(GlobalMessagesService);
    this.anchorScrollerService = injector.get(AnchorScrollerService);
  }
  ngOnInit(): void {
    const { 0: {
      footer=undefined,
      title=undefined,
      rrss=undefined
    } = {} } = this.globalMessageService.getPageDataSynch() || [];
    this.vT$.title.next(title);
    this.vT$.footer_text.next(footer);
    this.vT$.rrss.next(rrss || []);

    this.anchorScrollerService.listen();
    this.globalMessageService.menuService.pipe(takeUntil(this._unsubscribe))
    .subscribe( val => {
      try{
        this.sidenav.close();
      }catch(err){}
    } );
  }
  ngOnDestroy(): void {
    this._unsubscribe.next(false);
    this._unsubscribe.complete();
  }
  doAction( data: {action: string; value: any;} ){
    const {action='', value=undefined} = data || {};
    const ACTIONS: any = {
      'side-nav-select': () => {
        const { options: {0: {value: _opt=undefined}={}}=[] } = value as MatSelectionListChange;
        this.selected = _opt;
      },
    };
    (!!ACTIONS[action] ? ACTIONS[action]() : false);
  }

}
