import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    {
        path: 'welcome/:id',
        component: UsersComponent,
    },
    {
        path: 'adminadmin',
        component: UsersComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}

