import { Component, OnInit, Input } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { VmService } from './vmservices';
import { Vm } from './vm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  guid='';
  title = 'Upload file';
  disableUpload = true;
  disableLoadAttributes = false;
  disableCancel = true;
  fileName = '';
  file: Blob;
  vms: Vm[] = [];

  constructor(private primengConfig: PrimeNGConfig, private http: HttpClient, private vmService: VmService){
    this.primengConfig.ripple = true;
    this.file = new Blob();
  }

  ngOnInit(){
    this.vmService.getVmsMedium().subscribe(data => this.vms = data)
  }

  uploadClicked(){
    this.disableUpload = true;
    this.disableLoadAttributes = true;
    this.disableCancel = false;
    const formData = new FormData();
    formData.append('TileImage', this.file);
    this.http.post('http://localhost:5000/Main', formData).subscribe(res => {
      alert(JSON.stringify(res));
    });
  }

  loadAttributesClicked(){

  }

  cancelClicked(){
    this.disableUpload = false;
    this.disableLoadAttributes = false;
    this.disableCancel = true;
  }

  generateGuidClicked(){
    this.guid = crypto.randomUUID();
  }

  browseClicked(event: any){
    this.fileName = event.files[0].name;
    this.disableUpload = false;
    this.file = event.files[0];
  }
}
