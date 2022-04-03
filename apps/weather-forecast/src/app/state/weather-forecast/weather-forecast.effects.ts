import { WeatherForecastApiService } from '@bp/weather-forecast/services';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as WeatherForecastActions from './weather-forecast.actions';
import { mergeMap, map, catchError } from 'rxjs';
import {
	getForecastSuccess,
	getForecastFailure,
	searchCitiesSuccess,
	searchCitiesFailure,
} from './weather-forecast.actions';

@Injectable()
export class WeatherForecastEffects {
	getSearchedCities$ = createEffect(() =>
		this.actions$.pipe(
			ofType(WeatherForecastActions.searchCities),
			mergeMap(action =>
				this.datasourse.searchCities(action.input).pipe(
					map(cities => searchCitiesSuccess({ cities })),
					catchError(async error => searchCitiesFailure({ error }))
				)
			)
		)
	);

	getForecast$ = createEffect(() =>
		this.actions$.pipe(
			ofType(WeatherForecastActions.getForecast),
			mergeMap(action =>
				this.datasourse.getForecast(action.lat, action.lon).pipe(
					map(forecast => {
						forecast.city = action.city;
						return getForecastSuccess({ forecast });
					}),
					catchError(async error => getForecastFailure({ error }))
				)
			)
		)
	);

	constructor(private readonly actions$: Actions, private datasourse: WeatherForecastApiService) {}
}
