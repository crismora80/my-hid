import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { AndroidSettings, IOSSettings, NativeSettings } from 'capacitor-native-settings';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@Injectable({providedIn: 'root'})
export class GPSService {
	constructor(
		private androidPermissions: AndroidPermissions,
		private locationAccuracy: LocationAccuracy
	) {}

	openGPS(): Promise<void> {
		return this.androidPermissions
		.checkPermission(
		  this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
		)
		.then(
		  (result) => {
			if (result.hasPermission) {
			  return this.requestToSwitchOnGPS();
			} else {
			  return this.askGPSPermission();
			}
		  },
		  (err) => {
			alert(err);
		  }
		);
	}
	askGPSPermission(): Promise<void> {
	  return this.locationAccuracy.canRequest().then((canRequest: boolean) => {
		if (canRequest) {
		} else {
		  this.androidPermissions
			.requestPermission(
			  this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
			)
			.then(
			  () => {
				this.requestToSwitchOnGPS();
			  },
			  (error) => {
				alert(error);
			  }
			);
		}
	  });
	}
	requestToSwitchOnGPS(): Promise<void> {
	  return this.locationAccuracy
		.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
		.then(
		  () => {console.log('accepteddd')},
		  (error) => alert(JSON.stringify(error))
		);
	}
}
