import {AfterViewInit, Component, ElementRef,
  Renderer2,OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../services/data.service';
import {DoctorModel} from '../../model/doctor.model';
import {DoctorService} from '../../services/doctor.service';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbDateStruct, NgbCalendar,
  NgbDate, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {Data} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],

})
export class TestComponent implements OnInit, AfterViewInit {
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  model: NgbDateStruct;
  date: {year: number, month: number};

  selectToday() {
    this.model = this.calendar.getToday();
  }


  public diagnoses = [];
  public src='';
  constructor(private renderer: Renderer2,
              private dataService: DataService,
              private http: HttpClient,
              private sanitizer: DomSanitizer,
              private calendar: NgbCalendar,
              public formatter: NgbDateParserFormatter,
              private doctorService: DoctorService) {
  }

  test() {
    this.doctorService.getAppointments().subscribe(data => {
      console.log(data);
    })

  }











  // onDateSelection(date: NgbDate) {
  //   if (!this.fromDate && !this.toDate) {
  //     this.fromDate = date;
  //   } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
  //     this.toDate = date;
  //   } else {
  //     this.toDate = null;
  //     this.fromDate = date;
  //   }
  // }
  //
  // isHovered(date: NgbDate) {
  //   return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  // }
  //
  // isInside(date: NgbDate) {
  //   return date.after(this.fromDate) && date.before(this.toDate);
  // }
  //
  // isRange(date: NgbDate) {
  //   return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  // }
  //
  // validateInput(currentValue: NgbDate, input: string): NgbDate {
  //   const parsed = this.formatter.parse(input);
  //   return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  // }
  ngOnInit() {
    // {responseType:'blob',}
    // this.http.get('/api/customer/test',{responseType:'blob',}).subscribe(data => {
    //   console.log(data);
    //   this.src = URL.createObjectURL(data);
    //   console.log(this.src);
    // });

    // this.dataService.getAllDiagnoses().subscribe(data => {
    //   this.diagnoses = data;
    // });
  }

  ngAfterViewInit(): void {

  }
  // @ViewChild('video', {static: true}) video: ElementRef;
  // @ViewChild('canvas', {static: true}) canvas: ElementRef;
  // context = this.canvas.getContext('2d');
  // videoHeight: number = 0;
  // videoWidth: number = 0;
  // constraints = {
  //   video: {
  //     facingMode: "environment",
  //     width: { ideal: 2000 },
  //     height: { ideal: 2000 }
  //   }
  // };
  // openCamera() {
  //   if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
  //     navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
  //   } else {
  //     alert('Sorry, camera not available.');
  //   }
  // }
  // handleError(error) {
  //   console.log('Error: ', error);
  // }
  //
  // attachVideo(stream) {
  //   this.renderer.setProperty(this.video.nativeElement, 'srcObject', stream);
  //   this.renderer.listen(this.video.nativeElement, 'play', (event) => {
  //     this.videoHeight = this.video.nativeElement.videoHeight;
  //     this.videoWidth = this.video.nativeElement.videoWidth;
  //   });
  // }
  //
  // leaveVideo(stream) {
  //   stream.getTracks()[0].stop();
  // }
  //
  // snap() {
  //   this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
  //   this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
  //   this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0);
  //
  // }

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
