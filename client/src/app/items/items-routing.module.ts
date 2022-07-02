import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('src/app/items/items.module').then(m => m.ItemsModule) },
  { path: 'form', loadChildren: () => import('src/app/items/form/form.module').then(m => m.FormModule) },
  { path: 'categories', loadChildren: () => import('src/app/items/categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'instructions', loadChildren: () => import('src/app/items/instructions/instructions.module').then(m => m.InstructionsModule) },
  { path: 'sets', loadChildren: () => import('src/app/items/sets/sets.module').then(m => m.SetsModule) },
  { path: 'groups', loadChildren: () => import('src/app/items/groups/groups.module').then(m => m.GroupsModule)},
  { path: 'menu', loadChildren: () => import('src/app/items/menu/menu.module').then(m => m.MenuModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ItemsRoutingModule {}
