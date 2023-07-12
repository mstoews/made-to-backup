import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BlogComponent } from './blog.component';
import { FashionComponent } from './fashion/fashion.component';
import { DetailComponent } from './detail/detail.component';
import { MaterialModule } from 'app/material.module';
import { BlogResolver } from 'app/4.services/blog.resolver';
import { SafePipe } from './safe.pipe';
import { HeaderComponent } from 'app/2.main/header/header.component';
import { FuseCardModule } from '@made-to/components/card';
import { IconsModule } from 'app/icons.module';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogRoutingModule } from './blog-routing/blog-routing.module';
import { SharedModule } from '../shared-module/shared.module';
import { CommentsComponent } from './comments/comments.component';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { ReplyDialogComponent } from './reply-dialog/reply-dialog.component';

@NgModule({
  declarations: [
    BlogComponent,
    FashionComponent,
    DetailComponent,
    SafePipe,
    BlogCardComponent,
    CommentsComponent,
    CommentsListComponent,
    ReplyDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgOptimizedImage,
    SharedModule,
    FuseCardModule,
    IconsModule,
    BlogRoutingModule,
  ],
  providers: [BlogResolver],
})
export class BlogModule {}
