import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeGeocoder,
         NativeGeocoderReverseResult} from '@ionic-native/native-geocoder';






@Injectable()
export class GeocoderProvider {

  constructor(public http: Http, private _GEOCODE  : NativeGeocoder) {
    
  }


  reverseGeocode(lat : number, lng : number) : Promise<any>
{
   return new Promise((resolve, reject) =>
   {
      this._GEOCODE.reverseGeocode(lat, lng)
      .then((result : NativeGeocoderReverseResult) =>
      {
      	console.log(result);
         //let str : string   = `The reverseGeocode address is ${result.street} in ${result.countryCode}`;
         resolve(result);
      })
      .catch((error: any) =>
      {
         reject(error);
      });
   });
}

}
