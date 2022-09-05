import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, delay, filter, Subject } from 'rxjs';

// Based on https://giancarlobuomprisco.com/angular/intersection-observer-with-angular
@Directive({
  selector: '[observeVisibility]'
})
export class ObserveVisibilityDirective implements OnDestroy, OnInit, AfterViewInit {
  @Input() debounceTime = 0;
  @Input() threshold = 1;
  @Input() delay = 0;
  @Input() actionCB = 'on-element-intersected';

  @Output() Emitter: EventEmitter<{action: string; value: { element: HTMLElement; isIntersecting: boolean; } }> = new EventEmitter<{action: string; value: { element: HTMLElement; isIntersecting: boolean; } }>();

  private observer: IntersectionObserver | undefined;
  private subject$: Subject<any> = new Subject<{
    entry: IntersectionObserverEntry;
    observer: IntersectionObserver;
  }>();

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.createObserver();
  }

  ngAfterViewInit() {
    this.startObservingElements();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }

    this.subject$.next(undefined);
    this.subject$.complete();
  }

  private createObserver() {
    const options = {
      rootMargin: '0px',
      threshold: this.threshold,
    };

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        this.subject$.next({ entry, observer });
      });
    }, options);
  }

  private startObservingElements() {
    if (!this.observer) {
      return;
    }

    this.observer.observe(this.element.nativeElement);

    this.subject$
      .pipe(debounceTime(this.debounceTime), filter(Boolean), delay(this.delay))
      .subscribe(async ({ entry }) => {
        const { target=undefined, isIntersecting=false } = entry || {};
        this.Emitter.emit( { action: this.actionCB ? `${this.actionCB}` : 'on-element-intersected', value: { element: target, isIntersecting } } );
      });
  }
}
