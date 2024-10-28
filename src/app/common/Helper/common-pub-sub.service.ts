import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Location, locationsOpts } from "../constants/interfaces";
import { User } from "../models/user";

@Injectable()
export class CommonPubSubService {

  private locationFilterOpts = new BehaviorSubject<locationsOpts | null>(null);
  locationFilterOpts$ = this.locationFilterOpts.asObservable();

  private userInfo = new BehaviorSubject<User | null>(null);
  userInfo$ = this.userInfo.asObservable();

  setLocationFilterOpts(opts: locationsOpts) {
    this.locationFilterOpts.next(opts);
  }

  setUserInfo(userInfo: User) {
    this.userInfo.next(userInfo)
  }
}