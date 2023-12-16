import { Injectable } from "@angular/core";
import { BleClient, ScanResult } from '@capacitor-community/bluetooth-le';
import { Subject } from "rxjs";
import { GPSService } from "./gps.service";

@Injectable({providedIn: 'root'})
export class BluetoothService {
	private scanDevicesSubject = new Subject<ScanResult>();
	scanDevices$ = this.scanDevicesSubject.asObservable();

    constructor(
        private gpsSvc: GPSService
	) {}

    async enableBlueTooth() {
        await BleClient.initialize();
		const isLocationEnabled = await BleClient.isLocationEnabled();
		if (!isLocationEnabled) {
		  await this.gpsSvc.openGPS();
		}
		const isBluetoothEnabled = await BleClient.isEnabled();
		if (!isBluetoothEnabled) {
			await BleClient.requestEnable();
		}

		BleClient.isEnabled().then(
			() => {
				console.log('opened');
				return this.scanForDevices();
			}
		);
	}

	private async scanForDevices() {
		BleClient
			.requestLEScan({allowDuplicates: false}, (device: ScanResult) => this.onDeviceDiscovered(device));
	}

	private onDeviceDiscovered(device: ScanResult): void {
		this.scanDevicesSubject.next(device);
		console.log(device.localName);
	}
}