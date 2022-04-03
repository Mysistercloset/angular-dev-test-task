export interface City {
	name: string;
	country: string;
	state: string;
	lat: number;
	lon: number;
}

export interface Forecast {
	city: string;
	timezone_offset: number;
	daily: DailyForecast[];
	hourly: HourlyForecast[];
}

export interface DailyForecast {
	temp: DailyTemperature;
	dt: number;
}

export interface DailyTemperature {
	min: number;
	max: number;
	day: number;
}

export interface HourlyForecast {
	dt: number;
	temp: number;
}

export enum ForecastMode {
	Daily,
	Hourly,
}
