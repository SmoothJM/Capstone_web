import {AfterViewInit, Component, ElementRef,
  Renderer2,OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../services/data.service';
import {DoctorModel} from '../../model/doctor.model';
import {DoctorService} from '../../services/doctor.service';

declare var $: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, AfterViewInit {

  @ViewChild('video', {static: true}) video: ElementRef;
  @ViewChild('canvas', {static: true}) canvas: ElementRef;
  // context = this.canvas.getContext('2d');
  videoHeight: number = 0;
  videoWidth: number = 0;
  constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 2000 },
      height: { ideal: 2000 }
    }
  };
  constructor(private renderer: Renderer2) {
  }
  openCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
      alert('Sorry, camera not available.');
    }
  }
  handleError(error) {
    console.log('Error: ', error);
  }

  attachVideo(stream) {
    this.renderer.setProperty(this.video.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.video.nativeElement, 'play', (event) => {
      this.videoHeight = this.video.nativeElement.videoHeight;
      this.videoWidth = this.video.nativeElement.videoWidth;
    });
  }

  leaveVideo(stream) {
    stream.getTracks()[0].stop();
  }

  snap() {
    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
    this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0);

  }

  // show() {
  //   // console.log(this.canvas.nativeElement.toDataURL());
  //   let base64Data = this.canvas.nativeElement.toDataURL();
  //   let blob = this.toBlob(base64Data);
  //   let fd = new FormData();
  //   fd.append('tongueImg', blob);
  //   console.log(fd.get('tongueImg'));
  // }
  //
  // toBlob (base64Data) {
  //   let byteString;
  //   if (base64Data.split(',')[0].indexOf('base64') >= 0)
  //     byteString = atob(base64Data.split(',')[1]);
  //   else
  //     byteString = unescape(base64Data.split(',')[1]);
  //   let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
  //   let ia = new Uint8Array(byteString.length);
  //   for (let i = 0; i < byteString.length; i++) {
  //     ia[i] = byteString.charCodeAt(i);
  //   }
  //   return new Blob([ia], {type: mimeString});
  // }






  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }


//   openCamera() {
//     if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia) {
//       navigator.mediaDevices.getUserMedia({video:{width:500,height:500}})
//         .then(this.success).catch(this.error);
//     }else {
//       alert("not support");
//     }
//   }
//
// //成功回调
//   success(stream) {
//     this.video.nativeElement.srcObject = stream;
//     this.video.nativeElement.play();
//   }
//
//   //失败回调
//   error(error) {
//     console.log(error);
//   }

}
