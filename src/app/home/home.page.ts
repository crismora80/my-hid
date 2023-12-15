import { Component, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { GPSService } from './services/bluetooth';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	text: string = '';
	devices: any[] = [];
	constructor(
		private ble: BLE,
		private ngZone: NgZone,
		private gpsSvc: GPSService
	) {}

	send() {
		this.ble.isLocationEnabled().then(
			() => this.enableBlueTooth(),
			() => this.gpsSvc.openGPS().then(() => this.enableBlueTooth())
		);
	}

	private enableBlueTooth() {
		this.ble.isEnabled().then(
			() => {
				console.log('opened');
				this.scanForDevices();
			},
			() => {
				console.log('closed');
				this.ble.enable().then(() => this.scanForDevices());
			}
		);
	}

	private scanForDevices() {
		this.devices = []; // clear list

		this.ble
			.scan([], 5)
			.subscribe((device) => this.onDeviceDiscovered(device));
	}

	private onDeviceDiscovered(device): void {
		this.ngZone.run(() => {
			this.devices.push(device);
			console.log(device);
		});
	}
}
