import { Component, NgZone } from '@angular/core';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { GPSService } from './services/gps.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage{
	text: string = '';
	devices: any[] = [];
	constructor(
		private ngZone: NgZone,
		private gpsSvc: GPSService
	) {}

	async send() {
		await BleClient.initialize();
		BleClient.isLocationEnabled().then(
			() => this.enableBlueTooth(),
			() => this.gpsSvc.openGPS().then(() => this.enableBlueTooth())
		);
	}

	private enableBlueTooth() {
		BleClient.isEnabled().then(
			() => {
				console.log('opened');
				this.scanForDevices();
			},
			() => {
				console.log('closed');
				BleClient.enable().then(() => this.scanForDevices());
			}
		);
	}

	private scanForDevices() {
		this.devices = []; // clear list

		BleClient
			.requestLEScan({}, (device) => this.onDeviceDiscovered(device));
	}

	private onDeviceDiscovered(device): void {
		this.ngZone.run(() => {
			this.devices.push(device);
			console.log(device);
		});
	}
}
