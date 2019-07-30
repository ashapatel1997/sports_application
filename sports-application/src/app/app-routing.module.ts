import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestResultsComponent } from '../app/test-results/test-results.component';
import { TestDetailsComponent } from '../app/test-details/test-details.component';
const routes: Routes = [
  { path: 'testresults', component: TestResultsComponent },
  { path: '', redirectTo: 'testresults', pathMatch: 'full' },
  { path: 'testdetails/:id', component: TestDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
