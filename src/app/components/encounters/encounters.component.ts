import { Component, OnInit } from '@angular/core';
import { EncountersService } from '../../services/encounters';
import { Report } from '../../models/report';

import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn
} from '@angular/forms';


@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.scss'],
  providers: [
    EncountersService
  ]
})
export class EncountersComponent implements OnInit {

  encounters: Report[]

  constructor(private encounterService: EncountersService) { }

  async ngOnInit() {
    this.encounters = await this.encounterService.getEncounters();
  }

}
