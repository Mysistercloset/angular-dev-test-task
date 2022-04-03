import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherForecastModule } from './modules/weather-forecast/weather-forecast.module';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => WeatherForecastModule,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
