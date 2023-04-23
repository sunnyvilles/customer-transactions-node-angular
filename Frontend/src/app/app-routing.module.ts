import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  // { path: '', redirectTo: '/timeline', pathMatch: 'full' },
  // { path: '**', redirectTo: '/timeline', pathMatch: 'full' },
  { path: '', component: TimelineComponent },
  // { path: 'detail', component: DetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
