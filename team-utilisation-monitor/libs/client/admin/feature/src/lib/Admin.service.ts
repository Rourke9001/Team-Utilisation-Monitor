import { Query } from '@nestjs/graphql';
import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { query } from '@angular/animations';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  company:any
  constructor(private client:HttpClient,private readonly cookie:CookieService){

  }


  //GET FUNCTIONS
  getCompany(companyName:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const Query='query{GetCompanyQuery(name:"'+companyName+'",token:"'+token+'",email:"'+email+'"){id,company_name,employees{name,surname,email,role,utilisation,weekly_Hours},admins{name,surname,email,role},teams{team_name},projects{project_name,man_hours,completed}}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })}

    return this.client.post<any>("http://localhost:3333/graphql",JSON.stringify({ query: Query}),options)
  }


  getCompanyStats(companyName: string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const query='query{getCompanyStats(company_name:"'+companyName+'",token:"'+token+'",email:"'+email+'"){numTeams,numAdmins,numProjects,numEmployees,Utilization,numCompleteProjects}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
  }

  getPendingRequests(companyName:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const query='query{getPendingRequests(company_name:"'+companyName+'",token:"'+token+'",email:"'+email+'"){name,surname,email}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
  }

  getInviteCode(companyName:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const query='query{getInviteCode(name:"'+companyName+'",token:"'+token+'",email:"'+email+'")}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
  }

  getAllTeamsOfACompany(companyName:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const Query='query{getAllTeamsOfACompany(company_name:"'+companyName+'",token:"'+token+'",email:"'+email+'"){team_name}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);

  }

  getAllPersons():Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const Query='query{getAllPeople(email:"'+email+'",token:"'+token+'"){id,name,surname,email,role,utilisation,positions{position},skill{skill}}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);

  }

  getTeamMembers(teamName:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const Query='query{GetTeamMembers(team_name:"'+teamName+'",token:"'+token+'",email:"'+email+'"){name,surname,email,utilisation,positions{position,team_name}}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  GetUnderUtilizedEmps(cName:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const Query='query{GetUnderUtilizedEmployees(company_name:"'+cName+'",token:"'+token+'",email:"'+email+'"){name,surname,email,role}}';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  getSkills():Observable<any>
  {
    const Query='query{GetSkill{skill}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);

  }

  getAvailableTeams(projectName:string):Observable<any>
  {
    const Query='query{GetAvailableTeams(project_name:"'+projectName+'")}'

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);

  }

  getAllProjectsOfACompany(companyName:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const Query='query{getAllProjectsOfACompany(company_name:"'+companyName+',token:"'+token+'",email:"'+email+'"){project_name}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);

  }

  /***
   * This function returns all the teams currently working of the project.
   * returns an array of [TeamEntity]
   *
   */
  getAllTeamsWorkingOnAProject(projectName:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const query='query{getAllTeamsWorkingOnProject(project_name:"'+projectName+'",token:"'+token+'",email:"'+email+'"){team_name}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);

  }

  GetCompanyUtilization():Observable<any>
  {

    const query='query{GetCompanyUtilization{JAN,FEB,MAR,APR,MAY,JUN,JUL,AUG,SEP,OCT,NOV,DEC,Utilisation}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
  }

  GetTeamsOnProject(projectName:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const query='query{GetTeamsOnProject(project_name:"'+projectName+'",token:"'+token+'",email:"'+email+'"){team_name}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
  }

  getTeamsOfACompanyWithTheirMembers(companyName:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const query='query{getAllTeamsOfAcompanyWithTheirMembers(email:"'+email+'",token:"'+token+'",company_name:"'+companyName+'"){ team_name,error_string,members{name,surname,email}}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
  }


  GetRecomendedTeam(numberOfMembers:number,skillName:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const query='query{GetRecomendedTeam(num_people:'+numberOfMembers+',skill_name:"'+skillName+'",token:"'+token+'",email:"'+email+'"){name,surname,email,project_points}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
  }



  //MUTATIONS

  assignProjectToTeams(teamName:string,projectName:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const query='mutation{assignProjectToTeamVName(team_name:"'+teamName+'",project_name:"'+projectName+'",token:"'+token+'",email:"'+email+'")}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);

  }

  createTeam(teamName:string,companyName:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const query='mutation{createTeam(team_name:"'+teamName+'",company_name:"'+companyName+'",token:"'+token+'",email:"'+email+'"){members{id,name}}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
  }

  deleteTeam(teamName:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const query='mutation{DeleteTeam(team_name:"'+teamName+'",token:"'+token+'",email:"'+email+'")'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
  }


  createInviteCode(companyName: string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const query='mutation{createInviteCode(company_name:"'+companyName+'",token:"'+token+'",email:"'+email+'"){inviteCode}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
  }

  createProject(projectName:string,companyName:string,teamName:string,manHours:number)
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const query='mutation{createProject(project_name:"'+projectName+'",company_name:"'+companyName+'",team_name:"'+teamName+'",man_hours:'+manHours+',token:"'+token+'",email:"'+email+'"){man_hours}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
  }

  approveRequest(employeeEmail:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const Query='mutation{approveRequestVEmail(email:"'+employeeEmail+'",token:"'+token+'",admin_email:"'+email+'")}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  AddTeamMember(teamName:string,email:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const Admin_email=this.cookie.get("Email");

    const Query='mutation{AddTeamMember(team_name:"'+teamName+'",email:"'+email+'",token:"'+token+'",admin_email:"'+Admin_email+'")}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  /***
   * Removes teamMember from a team
  */

  DeleteTeamMember(teamName:string,email:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const Admin_email=this.cookie.get("Email");

    const Query='mutation{DeleteTeamMember(team_name:"'+teamName+'",email:"'+email+'",token:"'+token+'",admin_email:"'+Admin_email+'")}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  /***
   * Permanently removes employee from the system.
  */

  DeleteEmployee(email:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const Admin_email=this.cookie.get("Email");

    const Query='mutation{DeleteEmployee(email:"'+email+'",token:"'+token+'",admin_email:"'+Admin_email+'"){name,surname}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  AddSkill(skillName:string):Observable<any>
  {

    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const Query='mutation{AddSkill(skillType:"'+skillName+'",token:"'+token+'",email:"'+email+'")}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  removeSkill(skill_name:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const Query='mutation{removeSkill(skill_name:"'+skill_name+'",token:"'+token+'",email:"'+email+'")}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  CalculateUtilization(projectName:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const Query='mutation{CalculateUtilization(project_Name:"'+projectName+'",token:"'+token+'",email:"'+email+'")}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  assignPositionToUser(position_name:string,team_name:string,assignee_email:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const Query='mutation{assignPositionToUser(position_name:"'+position_name+'",assignee_email:"'+assignee_email+'",email:"'+email+'",token:"'+token+'",team_name:"'+team_name+'"){message error_string}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }


  updateWeeklyHoursForEmployee(email:string,hours:number):Observable<any>
  {
    const token=this.cookie.get("token");
    const Admin_email=this.cookie.get("Email");

    const Query='mutation{AssignHours(email:"'+email+'",weekly_hours:'+hours+',token:"'+token+'",admin_email:"'+Admin_email+'")}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  CompleteProject(projectName:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const Query='mutation{CompleteProject(project_name:"'+projectName+'",token:"'+token+'",email:"'+email+'")}';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  DeleteProject(projectName:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const Query='mutation{DeleteProject(project_name:"'+projectName+'",token:"'+token+'",email:"'+email+'")}';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  createPosition(position_name:string):Observable<any>
  {
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const Query='mutation{addPosition(position_name:"'+position_name+'",email:"'+email+'",token:"'+token+'"){message,error_string}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  getAllPositions():Observable<any>{
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const Query='query{getAllPositions(token:"'+token+'",email:"'+email+'"){position,error_string}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  removePosition(position_name:string):Observable<any>{
    const token=this.cookie.get("token");
    const email=this.cookie.get("Email");

    const Query='mutation{removePosition(token:"'+token+'",email:"'+email+'",position_name:"'+position_name+'")}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);

  }

}
