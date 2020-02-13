import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'trustUrl'
})
export class TrustUrlPipePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }
  transform(url: any, args?: any): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
