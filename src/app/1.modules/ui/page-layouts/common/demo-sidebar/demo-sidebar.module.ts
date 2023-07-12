import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FuseNavigationModule } from '@made-to/components/navigation/navigation.module';
import { DemoSidebarComponent } from 'app/features/admin/ui/page-layouts/common/demo-sidebar/demo-sidebar.component';

@NgModule({
  declarations: [DemoSidebarComponent],
  imports: [
    RouterModule.forChild([]),
    MatIconModule,
    MatProgressBarModule,
    FuseNavigationModule,
  ],
  exports: [DemoSidebarComponent],
})
export class DemoSidebarModule {}
