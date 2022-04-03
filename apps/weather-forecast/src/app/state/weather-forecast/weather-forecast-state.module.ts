import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WeatherForecastServicesModule } from '@bp/weather-forecast/services';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { WeatherForecastEffects } from './weather-forecast.effects';
import * as fromWeatherForecast from './weather-forecast.reducer';

@NgModule({
	imports: [
		CommonModule,
		WeatherForecastServicesModule,
		StoreModule.forFeature(fromWeatherForecast.WEATHER_FORECAST_FEATURE_KEY, fromWeatherForecast.reducer),
		EffectsModule.forFeature([WeatherForecastEffects]),
	],
	declarations: [],
})
export class WeatherForecastStateModule {}
