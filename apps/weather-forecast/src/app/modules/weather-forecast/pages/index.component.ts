import { Messages } from './../utils/const';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { filter, Subject, takeUntil } from 'rxjs';
import { getErrorSelector } from '../../../state/weather-forecast/weather-forecast.selectors';

@Component({
	selector: 'bp-index',
	templateUrl: './index.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent implements OnInit, OnDestroy {
	ngUnsubscribe$ = new Subject<unknown>();

	constructor(private store: Store, private message: NzMessageService) {}

	ngOnInit(): void {
		this.store
			.pipe(
				takeUntil(this.ngUnsubscribe$),
				select(getErrorSelector),
				filter(x => !!x)
			)
			.subscribe((error: any) => {
				this.message.error(Messages.COMMON_ERROR);
			});
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe$.next(null);
		this.ngUnsubscribe$.complete();
	}
}
