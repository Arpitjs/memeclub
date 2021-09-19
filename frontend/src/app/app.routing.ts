import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router'
import { GeneratorComponent } from './memegenerator/memegenerator.component'
import { MemeapiComponent } from './memeapi/memeapi.component'
import { FacebookShareComponent } from './share/share.component';
let routes: Routes = [
    {
        path: '', loadChildren: './modules/auth.module#AuthModule'
    },
    {
        path: 'streams', loadChildren: './modules/streams.module#StreamsModule'
    },
    {
        path: 'memegen',
        component: GeneratorComponent,
      },
      {
        path: 'memeapi',
        component: MemeapiComponent,
      }, 
      {
        path: 'share',
        component: FacebookShareComponent,
      }, 
     
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}