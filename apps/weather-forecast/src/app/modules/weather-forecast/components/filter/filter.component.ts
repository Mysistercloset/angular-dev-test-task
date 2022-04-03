import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'bp-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
	dayView = false;
	// constructor() {}

	ngOnInit(): void {
		console.log('x');
	}
}
