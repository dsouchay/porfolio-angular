import { animate, AnimationBuilder, AnimationFactory, style } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EducationService } from '../../services';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationComponent implements OnInit, OnDestroy {
  vT$ = {
    educations: []
  };
  protected builder: AnimationBuilder;
  protected educationService: EducationService;
  protected cDR: ChangeDetectorRef;
  protected _unsubscribe: Subject<boolean> = new Subject();
  constructor(
    protected injector: Injector
  ) {
    this.builder = injector.get(AnimationBuilder);
    this.cDR = injector.get(ChangeDetectorRef);
    this.educationService = injector.get(EducationService);
  }

  ngOnInit(): void {
    this.educationService.getEducations().pipe(takeUntil(this._unsubscribe)).subscribe( val => {
      this.vT$.educations = val;
      this.cDR.markForCheck();
    } );
  }
  ngOnDestroy(): void {
    this._unsubscribe.next(false);
    this._unsubscribe.complete();
  }
  doAction(data){
    const { action = undefined, value = undefined } = data || {};
    const ACTIONS = {
      'on-element-intersected': () => {
        const {
          element = undefined,
          isIntersecting = false
        } = value as { element: HTMLElement; isIntersecting: boolean; } || {};
        if ( element ) {
          let animation: AnimationFactory;
          if ( isIntersecting ) {
            animation = this.builder.build([
              animate( '0.4s ease-in-out', style( { transform: `translateX(0px)`, opacity: 1 } ) )
            ]);
          } else {
            animation = this.builder.build([
              animate( '0.4s ease-in-out', style( { transform: `translateX(-2rem)`, opacity: 0 } ) )
            ]);
          }
          const player = animation.create(element);
          player.play();
        }
      }
    };
    (!!ACTIONS[action] ? ACTIONS[action]() : false);
  }
}
