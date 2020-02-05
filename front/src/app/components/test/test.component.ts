import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {DoctorModel} from '../../model/doctor.model';
import {DoctorService} from '../../services/doctor.service';
declare var $:any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  public doctors: DoctorModel[];

  constructor(private dataService: DataService,
              private doctorService: DoctorService) { }

  ngOnInit() {

    // $(document).ready(function() {
    //   $('.faq .question').on('click', function () {
    //     $(this).parents('.panel').toggleClass('open').siblings().removeClass('open');
    //     $(this).siblings('.answer').slideToggle(300);
    //     $(this).parents('.panel').siblings().find('.answer').slideUp(300);
    //   });
    // });

    this.doctorService.getDoctors().subscribe(data => {
      this.doctors = data['doctors'];
      console.log(this.doctors);
    })
  }

}
