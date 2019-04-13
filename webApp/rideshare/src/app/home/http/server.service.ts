import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';


@Injectable() // decorator
export class ServerService {
    gpsData = { lat: 0, lng: 0, city: ''};
    // added http and auth service
    constructor(private http: Http,
                private authService: AuthService) {}

    // added or update user data
    storeInServer(data: any) {
        // get user token and id
        const token = this.authService.getIdToken();
        const uid = this.authService.getUid();

        // return this.http.post('https://dbproject-49b7b.firebaseio.com/user.json', servers);
        // store data using put method
        return this.http.put('https://dbproject-49b7b.firebaseio.com/user/' + uid + '.json?auth=' + token, data);
    }

    // get user data
    getFromServer() {
        // get user token and id
        const token = this.authService.getIdToken();
        const uid = this.authService.getUid();

        // get data using get method
        return this.http.get('https://dbproject-49b7b.firebaseio.com/user/' + uid + '.json?auth=' + token)
        .map(
            (response: Response) => {
                return response.json();
            }
        )
        .catch(
            (error: Response) => {
                return Observable.throw ('error!!');
            }
        );
    }

    // get online user
    getOnlineFromServer() {
        // get user token and id
        const token = this.authService.getIdToken();
        const uid = this.authService.getUid();

        // get data using get method
        return this.http.get('https://dbproject-49b7b.firebaseio.com/online/.json?auth=' + token)
            .map(
                (response: Response) => {
                    return response.json();
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw('error!!');
                }
            );
    }

    // add or update online user
    storeOnlineInServer(data: any) {
        // get user token and id
        const token = this.authService.getIdToken();
        const uid = this.authService.getUid();

        // added data using put method
        return this.http.put('https://dbproject-49b7b.firebaseio.com/online/' + uid + '.json?auth=' + token, data);
    }

    // delete offline user
    deleteOnlineInServer() {
        // get user token and id
        const token = this.authService.getIdToken();
        const uid = this.authService.getUid();

        // delete data using delete method
        return this.http.delete('https://dbproject-49b7b.firebaseio.com/online/' + uid + '.json?auth=' + token);
    }

}
