import { Component, OnInit } from '@angular/core';
import { AlienService } from '../../services/alien';
import { EncountersService } from '../../services/encounters';
import { ColonistService } from '../../services/colonist';
import { Alien } from '../../models/alien';
import { NewReport } from '../../models/report';
import { Router } from '@angular/router';


import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn
} from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [
    AlienService,
    EncountersService,
    ColonistService
  ]
})
export class ReportComponent implements OnInit {

  aliens: Alien[] = [];

  reportForm = new FormGroup({
    atype: new FormControl('', [Validators.required,
    Validators.maxLength(20),
    Validators.minLength(3),
    this.noNumbers(/\d/ )]),
    action: new FormControl('', [Validators.required]),

  });

  constructor(private alienService: AlienService,
    private encountersService: EncountersService,
    private router: Router) { }


  async ngOnInit() {
    this.aliens = await this.alienService.getAliens();
    // this.date = new Date().toISOString().slice(0,10);
  }

  async reportEncounters() {
    const reportEncounters: NewReport = {
      atype: this.reportForm.get('atype').value,
      date: '07-30-2017',
      action: this.reportForm.get('action').value,
      colonist_id: '4'
    }

    const report = await this.encountersService.reportEncounters(reportEncounters);
    this.router.navigate(['encounters']);

  }

  private noNumbers(validNameRegex): ValidatorFn {
    return (control): { [key: string]: any } => {
      const forbiddenName = validNameRegex.test(control.value);
      return forbiddenName ? { 'forbiddenName': { value: control.value } } : null;
    };
  }

}

