import { LiteralMapEntry } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import {
	AndroidPermissionResponse,
	AndroidPermissions,
} from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

@Injectable()
export class GPSService {
	constructor(
		private androidPermissions: AndroidPermissions,
		private locationAccuracy: LocationAccuracy,
		private openNativeSettings: OpenNativeSettings
	) {}

	openGPS(): Promise<void> {
		return this.androidPermissions
			.checkPermission(
				this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
			)
			.then(
				(result) => {
					if (result.hasPermission) {
						//If having permission show 'Turn On GPS' dialogue
						return this.askToTurnOnGPS();
					} else {
						//If not having permission ask for permission
						return this.requestGPSPermission();
					}
				},
				(err) => {
					alert(err);
				}
			);
	}

	private requestGPSPermission(): Promise<void> {
		return this.locationAccuracy
			.canRequest()
			.then((canRequest: boolean) => {
				if (!canRequest) {
					this.openNativeSettings.open('application_details');
				} else {
					//Show 'GPS Permission Request' dialogue
					return this.androidPermissions
						.requestPermission(
							this.androidPermissions.PERMISSION
								.ACCESS_COARSE_LOCATION
						)
						.then(
							(response: AndroidPermissionResponse) => {
								return this.askToTurnOnGPS();
							},
							(error) => {
								//Show alert if user click on 'No Thanks'
								alert(
									'requestPermission Error requesting location permissions ' +
										error
								);
							}
						);
				}
			});
	}

	private askToTurnOnGPS(): Promise<void> {
		return this.locationAccuracy
			.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
			.then(
				() => {},
				(error) =>
					alert(
						'Error requesting location permissions ' +
							JSON.stringify(error)
					)
			);
	}
}
