import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { GlobalMessagesService } from 'src/app/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule, MatListModule ],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideComponent implements OnInit {
  sideNavItems: {label: string; id: string;}[] = [
    {label: 'About me', id: 'about-me'},
    {label: 'Work Experience', id: 'work-experience'},
    {label: 'Skills', id: 'skills'},
    {label: 'Education', id: 'education'},
  ];
  selected: string = '';
  protected globalMessagesService: GlobalMessagesService;
  protected router: Router;
  constructor(
    protected injector: Injector
  ) {
    this.globalMessagesService = injector.get(GlobalMessagesService);
    this.router = injector.get(Router);
  }

  ngOnInit(): void {
  }
  doAction( data: {action: string; value: any;} ){
    const {action='', value=undefined} = data || {};
    const ACTIONS: any = {
      'side-nav-select': () => {
        const { options: {0: {value: {id: _opt=undefined}={}}={}}=[] } = value as MatSelectionListChange;

        this.selected = _opt;
        this.router.navigate(['/'], { fragment: _opt })
        this.globalMessagesService.setMenuService({action: 'submen-selected', component: 'HOME', value: _opt});
      },
    };
    (!!ACTIONS[action] ? ACTIONS[action]() : false);
  }
}
