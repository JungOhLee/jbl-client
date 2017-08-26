import { enableProdMode, isDevMode } from '@angular/core';
import { environment } from '../environments/environment';

export const baseUrl: string = setBaseUrl();

function setBaseUrl(){
  if(!environment.production){
    return 'http://jbl-api-devel.snumedu.net:5000'
  } else {
    return 'http://jbl-api.snumedu.net:5000'
  }
}

// export const baseUrl: string = 'http://jbl-api-devel.snumedu.net:5000'
