import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceGuard } from '../maintenance/maintenance.guard';
import { CoreModule } from '../../core/core.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FullpageMessageModule } from '../../modules/fullpage-message/fullpage-message.module';
import { PageLoaderModule } from '../../modules/page-loader/page-loader.module';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { AdminGuard } from '../../core/guard/admin.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserAvatarModule } from '../../modules/user-avatar/user-avatar.module';
import { PipesModule } from '../../pipes/pipes.module';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { ProgressPopupModule } from '../../modules/progress-popup/progress-popup.module';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    canActivate: [MaintenanceGuard]
  },
  {
    path: 'new',
    component: NewEntryComponent,
    canActivate: [MaintenanceGuard, AdminGuard]
  },
  {
    path: ':slug',
    component: BlogComponent,
    canActivate: [MaintenanceGuard]
  }
];

@NgModule({
  declarations: [BlogComponent, NewEntryComponent, BlogPostComponent],
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    NgZorroAntdModule,
    CoreModule,
    FullpageMessageModule,
    PageLoaderModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ProgressPopupModule,

    RouterModule.forChild(routes),
    MarkdownModule,
    UserAvatarModule,
    PipesModule
  ]
})
export class BlogModule {
}
