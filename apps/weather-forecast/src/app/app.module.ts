import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WeatherForecastServicesModule } from '@bp/weather-forecast/services';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WeatherForecastStateModule } from './state/weather-forecast/weather-forecast-state.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		CommonModule,
		AppRoutingModule,
		WeatherForecastServicesModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		WeatherForecastStateModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'en-US' },
		{ provide: NZ_I18N, useValue: en_US },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
