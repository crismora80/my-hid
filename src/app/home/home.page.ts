import { Component, NgZone } from '@angular/core';
import { BluetoothService } from './services/bluetooth.service';

import { GPSService } from './services/gps.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage{
	text: string = '';

	constructor(
		private bluetoothSvc: BluetoothService,
		
	) {}

	async send() {
		await this.bluetoothSvc.enableBlueTooth();
	}


}
