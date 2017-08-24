import { Component, OnInit } from '@angular/core';
import { AlienService } from '../../services/alien';
import { Alien } from '../../models/alien';

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
    AlienService
  ]
})
export class ReportComponent implements OnInit {

  public aliens: Alien[];
  
    registerForm = new FormGroup({
      alien_id: new FormControl('', [Validators.required])
    });

  constructor(private alienService: AlienService
  ) { }
  

  async ngOnInit() {
    this.aliens = await this.alienService.getAliens();
      console.log(this.aliens);
  }

}
