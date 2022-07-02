import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { GroupService } from 'src/app/shared/_services/http/group.service';
import { SelectItem } from 'src/app/shared/_consts/select-item';

@Injectable()
export class GroupsSelectResolve implements Resolve<SelectItem[]> {

  constructor(private groupService: GroupService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const groupType = state.url.split('/')[1];

    return this.groupService.selectGroups(groupType).then(response => response as SelectItem[]);
  }
}
