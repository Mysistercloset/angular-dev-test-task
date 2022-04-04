import { createAction, props } from '@ngrx/store';
import { City, Forecast, ForecastMode } from './models/weather-forecast.models';

export const searchCities = createAction('[WeatherForecast/API] SearchCities', props<{ input: string }>());

export const searchCitiesSuccess = createAction(
	'[WeatherForecast/API] SearchCities Success',
	props<{ cities: City[] }>()
);

export const searchCitiesFailure = createAction('[WeatherForecast/API] SearchCities Failure', props<{ error: any }>());

export const setMode = createAction('[WeatherForecast/API] SetMode', props<{ mode: ForecastMode }>());

export const setModeSuccess = createAction(
	'[WeatherForecast/API] SetMode Success',
	props<{ mode: ForecastMode }>()
);

export const getForecast = createAction('[WeatherForecast/API] GetForecast', props<{ lat: number; lon: number, city: string }>());

export const getForecastSuccess = createAction('[WeatherForecast/API] GetForecast Success', props<{ forecast: Forecast }>());

export const getForecastFailure = createAction('[WeatherForecast/API] GetForecast Failure', props<{ error: any }>());
