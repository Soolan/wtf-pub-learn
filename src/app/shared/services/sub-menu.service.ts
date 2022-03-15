import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SubMenu} from '../models/sub-menu';

@Injectable({
  providedIn: 'root'
})
export class SubMenuService {
  private readonly subMenuSubject: Subject<SubMenu>;

  constructor() {
    this.subMenuSubject = new Subject<SubMenu>();
  }

  toggleSubMenu(snapshot: SubMenu): void {
    this.subMenuSubject.next(snapshot);
  }

  onSubMenuToggle(): Observable<SubMenu> {
    return this.subMenuSubject;
  }
}
