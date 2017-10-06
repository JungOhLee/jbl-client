import { enableProdMode, isDevMode } from '@angular/core';
import { environment } from '../environments/environment';

export const baseUrl: string = setBaseUrl();

function setBaseUrl(){
  if(!environment.production){
    return 'http://jbl-api-devel.snumedu.net:8000'
  } else {
    return 'http://jbl-api.ap-northeast-2.elasticbeanstalk.com'
  }
}

// export const baseUrl: string = 'http://jbl-api-devel.snumedu.net:5000'
