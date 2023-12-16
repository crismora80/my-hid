import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ScanResult } from '@capacitor-community/bluetooth-le';
import { BluetoothService } from './services/bluetooth.service';

import { GPSService } from './services/gps.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
	text: string = '';
	devices: ScanResult[] = [];

	constructor(
		private bluetoothSvc: BluetoothService,
		private changeDetectorRef: ChangeDetectorRef
		
	) {}

	ngOnInit(): void {
		this.bluetoothSvc.scanDevices$.subscribe((device: ScanResult) => {
			this.devices.push(device); 
			this.changeDetectorRef.detectChanges();
		});
	}

	async send() {
		this.devices = [];
		await this.bluetoothSvc.enableBlueTooth();
	}


}
