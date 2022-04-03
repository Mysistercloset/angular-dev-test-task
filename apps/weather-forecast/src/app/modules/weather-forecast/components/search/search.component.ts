import { City } from './../../../../state/weather-forecast/models/weather-forecast.models';
import { getForecast, searchCities } from './../../../../state/weather-forecast/weather-forecast.actions';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getSearchedCitiesSelector } from 'apps/weather-forecast/src/app/state/weather-forecast/weather-forecast.selectors';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'bp-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
	selectedCity: City | null = null;
	options: NzSelectOptionInterface[] = [];
	ngUnsubscribe$ = new Subject<unknown>();

	constructor(private store: Store, private cdr: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.store.pipe(takeUntil(this.ngUnsubscribe$), select(getSearchedCitiesSelector)).subscribe((cities: City[]) => {
			this.options = cities.map(city => ({
				value: city,
				label: `${city.name} (${city.country}, ${city.state ?? ''})`,
			}));
			this.cdr.detectChanges();
		});
	}

	onSearch(city: string): void {
		if (!city.length) return;

		this.store.dispatch(searchCities({ input: city }));
	}

	onSelect(city: City | null): void {
		this.selectedCity = city;

		if (!city) {
			this.options = [];
			return;
		}

		this.store.dispatch(getForecast({ lat: city.lat, lon: city.lon, city: city.name }));
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe$.next(null);
		this.ngUnsubscribe$.complete();
	}
}
