import { Forecast } from './../../../../state/weather-forecast/models/weather-forecast.models';
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
	data: string[][] = [];
	headers: string[] = [];

	constructor(private store: Store, private cdr: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.store
			.pipe(
				takeUntil(this.ngUnsubscribe$),
				select(getForecastsSelector),
				filter(x => !!x && x.length > 0)
			)
			.subscribe((forecasts: Forecast[]) => {
				console.log(forecasts);
				this.headers = []
				this.data = []
				this.headers.push('City');
				const dailyHeaders = forecasts[0].daily.map(day => format(day.dt * 1000, 'iiiiii'));
				this.headers = [...this.headers, ...dailyHeaders];
				
				forecasts.map(forecast => {
					const dailyData = [forecast.city, ...forecast.daily.map(day => Math.floor((day.temp.max + day.temp.min) / 2).toString())];
					console.log(dailyData)
					this.data = [...this.data, dailyData]
				});
				console.log(this.data)
				this.cdr.detectChanges();
			});
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe$.next(null);
		this.ngUnsubscribe$.complete();
	}
}
