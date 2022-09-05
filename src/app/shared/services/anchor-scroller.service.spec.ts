import { TestBed } from "@angular/core/testing";
import { AnchorScrollerService } from "./anchor-scroller.service";

describe( 'On Anchor scroller service', () => {
  let service: AnchorScrollerService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnchorScrollerService);
  });

  it( 'should be created', () => {
    expect(service).toBeTruthy();
  });
} );
