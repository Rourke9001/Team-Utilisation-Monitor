import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-admin-team-project-view',
  templateUrl: './admin-team-project-view.component.html',
  styleUrls: ['./admin-team-project-view.component.scss'],
})
export class AdminTeamProjectViewComponent implements OnInit {
  //constructor() {}
  boolshow = true;
  panelOpenState = false;
  
  OutTeamNames = [{Name: "I Create Software"},
                  {Name: "University Of Pretoria"},
                  {Name: "Tuks Rugby"},
                  {Name: "Tuks Sport"},
                ];

  OutProject = [{Name: "Delete Software", TeamName: "I Create Software"},
                    {Name: "Create Software", TeamName: "I Create Software"},
                    {Name: "Create FronteEnd", TeamName: "I Create Software"},
                    {Name: "Delete FronteEnd", TeamName: "I Create Software"},
                    {Name: "Finish all Projects", TeamName: "I Create Software"},
                  ];

  ngOnInit(): void {
    console.log();
  }
}
