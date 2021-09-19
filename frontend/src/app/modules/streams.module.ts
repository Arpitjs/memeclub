import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsRoutingModule } from './streams-routing.';
import { StreamsComponent } from '../components/streams/streams.component';
import { TokenService } from '../services/token.service';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { PostsComponent } from '../components/posts/posts.component';
import { PostsFormComponent } from '../components/posts/posts-form/posts-form.component';
import { PostService } from '../services/post.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommentsComponent } from '../components/comments/comments.component';
import { RouterModule } from '@angular/router';
import { UsersComponent } from '../components/users/users.component';
import { UserService } from '../services/user.service';
import { followersComponent } from '../components/users/followers/followers.component';
import {FollowingComponent  } from '../components/users/following/following.component';
import { NotificationsComponent } from '../components/notifications/notifications.component'
import { MomentService } from '../services/moment.service';
import { TopStreamsComponent } from '../components/streams/top-streams/top-streams.component';
import { ChatComponent } from '../components/chat/chat.component';
import { MessageComponent } from '../components/chat/message/message.component';
import { MessagesService } from '../services/messages.service';
import {NgxAutoScrollModule} from 'ngx-auto-scroll';
import { ImagesComponent } from '../components/images/images.component'
import {FileUploadModule } from 'ng2-file-upload'
import {ImageService } from '../services/image.service';
import { ViewUserComponent } from '../components/view-user/view-user.component';
import { ChangePasswordComponent } from '../components/users/change-password/change-password.component'
import {GeneratorComponent  } from './../memegenerator/memegenerator.component'
import {ColorChromeModule } from 'ngx-color/chrome'
import { MDBBootstrapModule } from 'angular-bootstrap-md'; 
import {ShareButtonsModule} from 'ngx-sharebuttons/buttons'
import {ShareIconsModule} from 'ngx-sharebuttons/icons'
import { MatPaginatorModule} from '@angular/material/paginator'

@NgModule({
  declarations: [
    StreamsComponent,
    ToolbarComponent,
    SidebarComponent,
    PostsComponent,
    PostsFormComponent,
    CommentsComponent,
    UsersComponent,
    followersComponent,
    FollowingComponent,
    NotificationsComponent,
    TopStreamsComponent,
    ChatComponent,
    MessageComponent,
    ImagesComponent,
    ViewUserComponent,
    ChangePasswordComponent,
    GeneratorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StreamsRoutingModule,
    NgxAutoScrollModule,
    RouterModule,
    FileUploadModule,
    ColorChromeModule,
    MDBBootstrapModule.forRoot(),
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule,
    MatPaginatorModule
  ],
  providers: [TokenService, PostService, UserService, MomentService, MessagesService,ImageService]
})
export class StreamsModule { }
