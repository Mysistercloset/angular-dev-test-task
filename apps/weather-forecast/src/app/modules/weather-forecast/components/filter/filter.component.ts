import { setMode } from './../../../../state/weather-forecast/weather-forecast.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ForecastMode } from 'apps/weather-forecast/src/app/state/weather-forecast/models/weather-forecast.models';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'bp-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit, OnDestroy {
	dailyMode = true;
	ngUnsubscribe$ = new Subject<unknown>();

	constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
			const mode = res.mode;

			if (!mode) return;
			this.dailyMode = mode === ForecastMode.Daily;
			this.store.dispatch(setMode({ mode }));
		});
	}

	onChange(isDaily: boolean): void {
		const mode = isDaily ? ForecastMode.Daily : ForecastMode.Hourly;
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: { mode },
			queryParamsHandling: 'merge',
		});
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe$.next(null);
		this.ngUnsubscribe$.complete();
	}
}
