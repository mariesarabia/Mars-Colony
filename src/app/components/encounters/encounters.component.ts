import { Component, OnInit } from '@angular/core';
import { EncountersService } from '../../services/encounters';


@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styles: []
})
export class EncountersComponent implements OnInit {

  constructor(private encounterService: EncountersService) { }

  async ngOnInit() {
    const encounter = await this.encounterService.getEncounters();
    console.log(encounter);
  }

}
