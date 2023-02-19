import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vm } from './vm';

@Injectable()
export class VmService {
    constructor(private http: HttpClient) { }

    getVmsMedium() {
        return this.http.get<Vm[]>('assets/vms-medium.json')
    }

    getVmsApi() {
        return this.http.get<any>('https://valsdotnetapp.azurewebsites.net/Main')
            .toPromise()
            .then(res => <Vm[]>res.data)
            .then(data => {
              console.log(data);
              return data;
            });
    }
}
