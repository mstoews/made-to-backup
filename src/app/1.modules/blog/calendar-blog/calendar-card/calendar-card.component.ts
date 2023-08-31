import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ImageItemIndexService } from 'app/4.services/image-item-index.service';
import { Blog } from 'app/5.models/blog';
import { imageItemIndex } from 'app/5.models/imageItem';
import { Observable } from 'rxjs';

@Component({
  selector: 'calendar-card',
  templateUrl: './calendar-card.component.html',
})
export class CalendarCardComponent {

  @Input() blog: Blog;
  blogImages$: Observable<(imageItemIndex & {id: string} )[]>;
  imageList = inject(ImageItemIndexService);
  router = inject(Router);

  ngOnInit(): void {
    this.blogImages$ = this.imageList.getAllImages(this.blog.id);
  }

  onOpenBlog(id: string) {
    this.router.navigate(['blog/calendar', id]);
    // this.toggleDrawer();
  }

  onAdd() {
    // console.debug('onAdd --- add a new comment');
  }

  valueChangedEvent($event: Event) {
    throw new Error('Method not implemented.');
  }

}