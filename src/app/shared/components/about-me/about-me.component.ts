import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalMessagesService } from '../../services';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutMeComponent implements OnInit {
  vT$ = {
    about: new BehaviorSubject(undefined),
    about_text: new BehaviorSubject(undefined),
    basic_information: new BehaviorSubject(undefined),
  };
  protected globalMessageService: GlobalMessagesService;
  constructor(
    protected injector: Injector
  ) {
    this.globalMessageService = injector.get(GlobalMessagesService);
  }

  ngOnInit(): void {
    const { 0: {
      about=[],
      about_text = undefined,
      basic_information=[]
    } = {} } = this.globalMessageService.getPageDataSynch() || [];
    this.vT$.about.next(about);
    this.vT$.about_text.next(about_text);
    this.vT$.basic_information.next(basic_information);
  }

}
