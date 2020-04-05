import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';
import {MessageService} from '../../services/message.service';
import {Message} from '../../model/message.model';

declare var $: any;

@Component({
  selector: 'app-quick',
  templateUrl: './quick.component.html',
  styleUrls: ['./quick.component.css']
})
export class QuickComponent implements OnInit {
  public submitted: boolean = false;
  public second: number = 0;
  public uploadForm: FormGroup;
  public tongueImg: File;
  public snapped: boolean = false;
  public fileName: string = 'Select your local tongue photo';
  public uploaded: boolean = true;
  public device: boolean = false;
  public wholeImg = 'http://127.0.0.1:3000/customer/tongue/';
  public boxImg = this.wholeImg + 'result_box/';
  public quickResult = {result:'',image:'',percentage:0};

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
              private dataService: DataService,
              private router: Router,
              private messageService: MessageService,
              private renderer: Renderer2) { }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      tongueImg: ['']
    });
  }

  openModal() {
    this.snapped = false;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      this.device = true;
      navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
      this.device = false;
      alert('Sorry, camera not available, please use Edge Browser');
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
    this.canvas.nativeElement.getContext('2d').clearRect(0,0,this.videoWidth,this.videoHeight);
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
      this.dataService.quickDiagnosis(fd).subscribe(data => {
        this.diagnoseResultDisplay(data);
      });
      this.closeCam();
      this.second = 20;
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

  closeModal(){
    $('#modal-detail').modal('hide');
  }

  diagnoseResultDisplay(data) {
    if (data.flag) {
      // TODO open modal to display diagnose result
      this.quickResult.result = data.result;
      this.quickResult.image = data.img;
      this.quickResult.percentage = data.percentage;
      $('#modal-detail').modal('show');

    } else {
      this.messageService.reportMessage(new Message(data.result, true));
    }
  }

  uploadSubmit() {
    this.messageService.reportMessage(new Message(''));
    const fd = new FormData();
    fd.append('tongueImg', this.tongueImg);
    this.second = 20;
    this.submitted = true;
    let delay = setInterval(() => {
      this.second -= 1;
      if(this.second == 0) {
        clearInterval(delay);
        this.submitted = false;
      }
    }, 1100);
    this.dataService.quickDiagnosis(fd).subscribe(data => {
      this.diagnoseResultDisplay(data);
    });
  }

  changeImg(event) {
    this.uploaded = false;
    this.tongueImg = event.target.files[0] as File;
    let imgSize = this.tongueImg.size;
    this.fileName = event.target.value.split('\\')[event.target.value.split('\\').length-1];
    if (imgSize > 1024 * 1024 * 3) {
      this.uploaded = true;
      this.messageService.reportMessage(new Message('Photo size may not exceed 3MB.', true));
      setTimeout(() => {
        this.messageService.reportMessage(new Message(''));
      }, 3000);
    }
  }













}
