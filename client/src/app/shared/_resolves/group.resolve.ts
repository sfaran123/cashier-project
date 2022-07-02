import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { GroupService } from 'src/app/shared/_services/http/group.service';

import { GroupModel } from 'src/app/shared/_models/group.model';

@Injectable()
export class GroupResolve implements Resolve<GroupModel> {

  constructor(private groupService: GroupService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.groupService.getGroup(route.params.id).then(response => response as GroupModel);
  }
}
