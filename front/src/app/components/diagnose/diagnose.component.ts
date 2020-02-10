import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {DataService} from '../../services/data.service';
import {CustomerModel} from '../../model/customer.model';
import {DoctorService} from '../../services/doctor.service';
import {DoctorModel} from '../../model/doctor.model';
import {Router} from '@angular/router';
import {MessageService} from '../../services/message.service';
import {Message} from '../../model/message.model';

declare var $: any;

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.component.html',
  styleUrls: ['./diagnose.component.scss']
})
export class DiagnoseComponent implements OnInit {
  public submitted: boolean = false;
  public second: number = 0;
  public uploadForm: FormGroup;
  public tongueImg: File;
  public customer: CustomerModel = new CustomerModel();
  public doctorsInit: DoctorModel[] = new Array();
  public docsPerPage: number = 5;
  public selectedPage: number = 1;
  public snapped: boolean = false;

  @ViewChild('video', {static: true}) video: ElementRef;
  @ViewChild('canvas', {static: true}) canvas: ElementRef;
  videoHeight: number = 0;
  videoWidth: number = 0;
  private currentStream: any;
  private constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 500 },
      height: { ideal: 500 }
    }
  };

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private dataService: DataService,
              private doctorService: DoctorService,
              private router: Router,
              private messageService: MessageService,
              private renderer: Renderer2) {
  }


  closeModal() {
    $('#modal-cam').modal('hide');
  }

  openModal() {
    this.snapped = false;
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
      alert('Sorry, camera not available.');
    }
  }
  attachVideo(stream) {
    this.currentStream = stream;
    this.renderer.setProperty(this.video.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.video.nativeElement, 'play', (event) => {
      this.videoHeight = this.video.nativeElement.videoHeight;
      this.videoWidth = this.video.nativeElement.videoWidth;
    });
  }
  handleError(error) {
    console.log('Error: ', error);
  }
  closeCam() {
    this.currentStream.getTracks().forEach(function (track) {
      track.stop();
    });
  }
  cleanSnap() {
    this.canvas.nativeElement.getContext('2d').clearRect(0,0,this.videoWidth,this.videoHeight);
    this.snapped = false;
  }
  snap() {
    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
    this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0);
    this.snapped = true;
  }

  toBlob (base64Data) {
    let byteString;
    if (base64Data.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(base64Data.split(',')[1]);
    else
      byteString = unescape(base64Data.split(',')[1]);
    let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type: mimeString});
  }

  uploadTake() {
    this.messageService.reportMessage(new Message(''));
    if (confirm('Are you sure to use this photo?')) {
      let base64Data = this.canvas.nativeElement.toDataURL('image/jpeg');
      let blob = this.toBlob(base64Data);
      let fd = new FormData();
      fd.append('tongueImg', blob);
      this.dataService.uploadTongueImg(fd).subscribe(data => {
        this.diagnoseResultDisplay(data.flag, data.result);
      });
      this.closeCam();
      this.second = 15;
      this.submitted = true;
      let delay = setInterval(() => {
        this.second -= 1;
        if(this.second == 0) {
          clearInterval(delay);
          this.submitted = false;
        }
      }, 1100);
    } else {
      this.cleanSnap();
    }
  }


  bindDoctor(doctor: DoctorModel) {
   let flag = confirm(`Are you sure to select ${doctor.username}?`);
   if (flag) {
     this.customer.docEmail = doctor.email;
     this.dataService.updateCustomer(this.customer).subscribe(data => {
       this.messageService.reportMessage(new Message(`You have selected ${doctor.username} as your personal doctor.`));
       setTimeout(() => {
         this.messageService.reportMessage(new Message(''));
       }, 1500);
     });
   }
  }

  diagnoseResultDisplay(flag, result?) {
    if (flag) {
      // this.diabetesLevel = data.result;
      this.messageService.reportMessage(new Message('Your diagnose is done, please check the result' +
        ' in Diagnose History.'));
      setTimeout(() => {
        this.messageService.reportMessage(new Message(''));
      }, 3000);
    } else {
      this.messageService.reportMessage(new Message(result, true));
    }
  }

  uploadSubmit() {
    // const customerName = this.uploadForm.controls.customerName.value;
    this.messageService.reportMessage(new Message(''));
    const fd = new FormData();
    fd.append('tongueImg', this.tongueImg);
    // console.log(fd.get('tongueImg'));
    // this.submitted = true;
    // setInterval(() => {
    //   this.second -= 1;
    // }, 1000);
    this.dataService.uploadTongueImg(fd).subscribe(data => {
      this.diagnoseResultDisplay(data.flag, data.result);
    });
  }

  changeImg(event) {
    this.tongueImg = event.target.files[0] as File;
    // console.log(this.tongueImg);
  }

  get doctors(): DoctorModel[] {
    let pageIndex = (this.selectedPage - 1) * this.docsPerPage;
    return this.doctorsInit.slice(pageIndex, pageIndex + this.docsPerPage);
  }

  addClickEvent() {
    setTimeout(() => {
      $('.expand-panel .panel-head').on('click', function() {
        $(this).parents('.panel').toggleClass('open').siblings().removeClass('open');
        $(this).siblings('.panel-body').slideToggle(300);
        $(this).parents('.panel').siblings().find('.panel-body').slideUp(300);
      });
    }, 100);
  }
  changePage(newPage: number) {
    this.selectedPage = newPage;
    this.addClickEvent();
  }
  get pageNumbers(): number[] {
    return Array(Math.ceil(this.doctorsInit.length / this.docsPerPage)).fill(0)
      .map((x, i) => i + 1);
  }

  ngOnInit() {
    this.doctorService.getDoctors().subscribe(data => {
      this.doctorsInit = data['doctors'];
    });
    this.addClickEvent();

    this.uploadForm = this.fb.group({
      tongueImg: ['']
    });

    this.dataService.getCustomer().subscribe(data => {
      this.customer = data;
      if (!this.customer.docEmail) {
        this.messageService.reportMessage(new Message('Before diagnose, please select a doctor as your' +
          ' personal doctor. Your diagnose report can only be viewed by the doctor you selected.', false));
      }
      setTimeout(() => {
        this.messageService.reportMessage(new Message(''));
      }, 5000);
    });
  }


}
