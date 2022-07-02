import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { GroupService } from 'src/app/shared/_services/http/group.service';

@Injectable()
export class GroupsResolve implements Resolve<any> {

  constructor(private groupService: GroupService) {}

  resolve() {
    return this.groupService.getGroups('items').then(response => response.items);
  }
}
