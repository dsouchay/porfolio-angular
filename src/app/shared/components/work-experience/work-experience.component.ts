import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalMessagesService } from '../../services';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkExperienceComponent implements OnInit {
  vT$ = {
    experiences: new BehaviorSubject(undefined)
  };
  protected globalMessageService: GlobalMessagesService;
  constructor(
    protected injector: Injector
  ) {
    this.globalMessageService = injector.get(GlobalMessagesService);
  }

  ngOnInit(): void {
    const { 0: {
      work_experience=[]
    } = {} } = this.globalMessageService.getPageDataSynch() || [];
    this.vT$.experiences.next( work_experience );
  }

}
