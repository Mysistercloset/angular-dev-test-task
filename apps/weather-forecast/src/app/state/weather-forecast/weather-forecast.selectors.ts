import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WEATHER_FORECAST_FEATURE_KEY, State } from './weather-forecast.reducer';

export const getWeatherForecastState = createFeatureSelector<State>(WEATHER_FORECAST_FEATURE_KEY);

export const getErrorSelector = createSelector(getWeatherForecastState, (state: State) => state.error);

export const getSearchedCitiesSelector = createSelector(getWeatherForecastState, (state: State) => state.searchedCities);

export const getModeSelector = createSelector(getWeatherForecastState, (state: State) => state.mode);

export const getForecastsSelector = createSelector(getWeatherForecastState, (state: State) => state.forecasts);
