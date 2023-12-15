import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { BLE } from '@ionic-native/ble/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { GPSService } from './services/bluetooth';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
	declarations: [HomePage],
	providers: [
		BLE,
		AndroidPermissions,
		LocationAccuracy,
		GPSService,
		OpenNativeSettings,
	],
})
export class HomePageModule {}
