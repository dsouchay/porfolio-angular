import { TestBed } from "@angular/core/testing";
import { GlobalMessagesService } from "./global-messages.service";

describe( 'On Global Message service', () => {
  let service: GlobalMessagesService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalMessagesService);
  });

  it( 'should be created', () => {
    expect(service).toBeTruthy();
  });
  it( '#menuService must return undefined', (done: DoneFn) => {
    service.menuService.subscribe( selected => {
      expect(selected).toBe(undefined);
      done();
    } );
  } );
  it( '#menuService must return and object', (done: DoneFn) => {
    service.setMenuService({});
    service.menuService.subscribe( selected => {
      expect(typeof selected).toBe('object');
      done();
    } );
  } );
} );
