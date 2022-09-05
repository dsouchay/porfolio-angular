import { animate, AnimationBuilder, AnimationFactory, style } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, delay, firstValueFrom, of, Subject, takeUntil } from 'rxjs';
import { SkillsService } from '../../services';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent implements OnInit, OnDestroy {
  protected builder: AnimationBuilder;
  vT$ = {
    skills: []
  };
  protected skillsService: SkillsService;
  protected cDR: ChangeDetectorRef;
  protected _unsubscribe: Subject<boolean> = new Subject();
  constructor(
    protected injector: Injector
  ) {
    this.builder = injector.get(AnimationBuilder);
    this.cDR = injector.get(ChangeDetectorRef);
    this.skillsService = injector.get(SkillsService);
  }

  ngOnInit(): void {
    this.skillsService.getSkills().pipe(takeUntil(this._unsubscribe)).subscribe( val => {
      this.vT$.skills = val.map( s => ({...s, id: s.skill, showed: new BehaviorSubject(0)}) );
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
              animate( '0.4s ease-in-out', style( {transform: `translateX(0px) rotateZ(0deg)`, opacity: 1} ) )
            ]);
          } else {
            animation = this.builder.build([
              animate( '0.4s ease-in-out', style( {transform: `translateX(-2rem) rotateZ(-5deg)`, opacity: 0} ) )
            ]);
          }
          const player = animation.create(element);
          player.onDone( () => {
            const skill = element.hasAttribute('data-skill') ? element.getAttribute('data-skill') : false;
            const selected = this.vT$.skills.find( e => e.id === skill );
            if ( !selected ) {
              return;
            }
            if ( isIntersecting ) {
              of(undefined).pipe(delay(0)).subscribe( () => {
                selected.showed.next(selected.base);
              } );
            } else {
              selected.showed.next(0);
            }
          } );
          player.play();
        }
      }
    };
    (!!ACTIONS[action] ? ACTIONS[action]() : false);
  }

}
