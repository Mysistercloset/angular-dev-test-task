import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';

import { WeatherForecastRoutingModule } from './weather-forecast-routing.module';
import { IndexComponent } from './pages/index.component';
import { SearchComponent } from './components/search/search.component';
import { FilterComponent } from './components/filter/filter.component';
import { TableComponent } from './components/table/table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [IndexComponent, SearchComponent, FilterComponent, TableComponent],
	imports: [
		CommonModule,
		WeatherForecastRoutingModule,
		FormsModule,
		NzSelectModule,
		NzSwitchModule,
		NzGridModule,
		NzMessageModule,
		NzTableModule,
	],
	providers: [],
})
export class WeatherForecastModule {}
