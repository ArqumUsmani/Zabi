import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Location, locationsOpts } from "../constants/interfaces";

@Injectable()
export class CommonPubSubService {

  private locationFilterOpts = new BehaviorSubject<locationsOpts | null>(null);
  locationFilterOpts$ = this.locationFilterOpts.asObservable();

  setLocationFilterOpts(opts: locationsOpts) {
    this.locationFilterOpts.next(opts);
  }
}