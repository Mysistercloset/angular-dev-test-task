import { City, Forecast } from './../../../../../../apps/weather-forecast/src/app/state/weather-forecast/models/weather-forecast.models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherForecastApiService {
	private _apiKey = '010721642521f31b0fbc8c3831d45951';
	// private _apiKey = '2fc989c856ca6c9b79d43973840fa44c';
	private _baseUrl = 'https://api.openweathermap.org';

	constructor(private http: HttpClient) {}

	searchCities(cityName: string): Observable<City[]> {
		return this.http
			.get<City[]>(`${this._baseUrl}/geo/1.0/direct?q=${cityName}&limit=10&appid=${this._apiKey}`)
	}

	getForecast(lat: number, lon: number): Observable<Forecast> {
		return this.http
			.get<Forecast>(`${this._baseUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&units=metric&appid=${this._apiKey}`)
	}
}
