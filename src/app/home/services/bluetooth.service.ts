import { Injectable, NgZone } from "@angular/core";
import { BleClient } from '@capacitor-community/bluetooth-le';
import { GPSService } from "./gps.service";

@Injectable({providedIn: 'root'})
export class BluetoothService {
    devices: any[] = [];

    constructor(
		private ngZone: NgZone,
        private gpsSvc: GPSService
	) {}

    async enableBlueTooth() {
        await BleClient.initialize();
		BleClient.isLocationEnabled().then(
			() => this.enableBlueTooth(),
			() => this.gpsSvc.openGPS().then(() => this.enableBlueTooth())
		);

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