import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index.component';

const routes: Routes = [
	{
		path: '',
		component: IndexComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class WeatherForecastRoutingModule {
	static components = [IndexComponent];
}
