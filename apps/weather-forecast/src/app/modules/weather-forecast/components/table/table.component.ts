import { getModeSelector } from './../../../../state/weather-forecast/weather-forecast.selectors';
import { Forecast, ForecastMode } from './../../../../state/weather-forecast/models/weather-forecast.models';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, Subject, takeUntil } from 'rxjs';
import { getForecastsSelector } from 'apps/weather-forecast/src/app/state/weather-forecast/weather-forecast.selectors';
import { format } from 'date-fns';

@Component({
	selector: 'bp-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnDestroy {
	ngUnsubscribe$ = new Subject<unknown>();
	mode: ForecastMode | null = null;
	data: string[][] = [];
	headers: string[] = [];

	dailyData: string[][] = [];
	dailyHeaders: string[] = [];
	hourlyData: string[][] = [];
	hourlyHeaders: string[] = [];

	constructor(private store: Store, private cdr: ChangeDetectorRef) {}

	get ForecastMode(): typeof ForecastMode {
		return ForecastMode;
	}

	ngOnInit(): void {
		this.store
			.pipe(
				takeUntil(this.ngUnsubscribe$),
				select(getForecastsSelector),
				filter(x => !!x && x.length > 0)
			)
			.subscribe((forecasts: Forecast[]) => {
				this._initTableData(forecasts);
				this._setDataByMode();

				this.cdr.detectChanges();
			});

		this.store.pipe(takeUntil(this.ngUnsubscribe$), select(getModeSelector)).subscribe((mode: ForecastMode) => {
			this.mode = mode;
			this._setDataByMode();

			this.cdr.detectChanges();
		});
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe$.next(null);
		this.ngUnsubscribe$.complete();
	}

	private _getTemp(num: number) {
		return `${Math.floor(num)} &#176;`;
	}

	private _initTableData(forecasts: Forecast[]): void {
		this.dailyData = [];
		this.dailyHeaders = [];
		this.hourlyData = [];
		this.hourlyHeaders = [];
		this.dailyHeaders.push('City');
		this.hourlyHeaders.push('City');

		const dailyHeaders = forecasts[0].daily.map(day => format(day.dt * 1000, 'iiiiii'));
		this.dailyHeaders = [...this.dailyHeaders, ...dailyHeaders].splice(0, 8);

		const hourlyHeaders = forecasts[0].hourly
			.map((hour, i) => (i % 3 === 0 ? format(hour.dt * 1000, 'HH:00') : null))
			.filter(x => !!x)
			.map(x => x as string);
		this.hourlyHeaders = [...this.hourlyHeaders, ...hourlyHeaders].splice(0, 9);

		forecasts.map(forecast => {
			const dailyData = [forecast.city, ...forecast.daily.map(day => this._getTemp((day.temp.max + day.temp.min) / 2))].splice(0, 8);
			const tempByHour = forecast.hourly
				.map((hour, i) => (i % 3 === 0 ? this._getTemp(hour.temp) : null))
				.filter(x => !!x)
				.splice(0, 8)
				.map(x => x as string);
			const hourlyData = [forecast.city, ...tempByHour];

			this.dailyData = [...this.dailyData, dailyData];
			this.hourlyData = [...this.hourlyData, hourlyData]
		});
	}

	private _setDataByMode(): void {
		switch (this.mode) {
			case ForecastMode.Daily:
				this.data = this.dailyData;
				this.headers = this.dailyHeaders;
				break;
			case ForecastMode.Hourly:
				this.data = this.hourlyData;
				this.headers = this.hourlyHeaders;
				break;
			default:
				break;
		}
	}
}
