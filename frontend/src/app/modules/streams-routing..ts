import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { StreamsComponent } from '../components/streams/streams.component'
import { AuthGuard } from '../services/auth.guard';
import { CommentsComponent } from '../components/comments/comments.component';
import { UsersComponent } from '../components/users/users.component';
import { FollowingComponent } from '../components/users/following/following.component';
import { followersComponent } from '../components/users/followers/followers.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { ChatComponent } from '../components/chat/chat.component';
import { ImagesComponent } from '../components/images/images.component';
import { ViewUserComponent } from '../components/view-user/view-user.component';
import { ChangePasswordComponent } from '../components/users/change-password/change-password.component';
import { GeneratorComponent } from '../memegenerator/memegenerator.component'


let routes:Routes = [
  {
    path: '',
    component: StreamsComponent,
    canActivate: [AuthGuard]
  },  {
    path: 'post/:id',
    component: CommentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/following',
    component: FollowingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/followers',
    component: followersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat/:name',
    component: ChatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'images/:name',
    component: ImagesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':name',
    component: ViewUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account/password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },

  {
    path: '**',
   redirectTo: 'streams'
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class StreamsRoutingModule { }
