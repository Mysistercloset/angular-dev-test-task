import { City, Forecast, ForecastMode } from './models/weather-forecast.models';
import { createReducer, on, Action } from '@ngrx/store';

import * as WeatherForecastActions from './weather-forecast.actions';

export const WEATHER_FORECAST_FEATURE_KEY = 'weatherForecast';

export interface State {
	searchedCities: City[];
	mode: ForecastMode;
	forecasts: Forecast[];
	error: string | null;
}

export interface WeatherForecastPartialState {
	readonly [WEATHER_FORECAST_FEATURE_KEY]: State;
}

export const initialState: State = {
	mode: ForecastMode.Daily,
	forecasts: [],
	searchedCities: [],
	error: null,
};

const weatherForecastReducer = createReducer(
	initialState,
	on(WeatherForecastActions.searchCitiesSuccess, (state, { cities }) => ({ ...state, searchedCities: cities })),
	on(WeatherForecastActions.searchCitiesFailure, (state, { error }) => ({ ...state, error })),
	on(WeatherForecastActions.setMode, (state, { mode }) => ({ ...state, mode })),
	on(WeatherForecastActions.getForecastSuccess, (state, { forecast }) => ({ ...state, forecasts: [...state.forecasts, forecast] })),
	on(WeatherForecastActions.getForecastFailure, (state, { error }) => ({ ...state, error })),
);

export function reducer(state: State | undefined, action: Action) {
	return weatherForecastReducer(state, action);
}
