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

  public aliens: Alien[];
  
    reportForm = new FormGroup({
      alien_id: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      
    });

  constructor(private alienService: AlienService,
    private encountersService: EncountersService,
    private router:Router) { }
  

  async ngOnInit() {
    this.aliens = await this.alienService.getAliens();
    // this.date = new Date().toISOString().slice(0,10);
  }

  // async registerColonist() {
  //   const newReport: NewReport = {
  //     atype: this.reportForm.get('atype').value, 
  //     date: this.reportForm.get('date').value,
  //     action: this.reportForm.get('action').value 
  //   }

  async reportEncounters(){
    const newReport: NewReport = {
      atype : this.reportForm.get('alien_id').value,
       date : '', //this.date,
      action : this.reportForm.get('description').value,
      colonist_id :'4'
    }

    await this.encountersService.reportEncounters(newReport);
    this.router.navigate(['encounters']);
  }

}

