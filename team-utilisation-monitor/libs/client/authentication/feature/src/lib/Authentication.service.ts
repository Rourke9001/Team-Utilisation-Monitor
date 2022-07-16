import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  Admin:any

  constructor(private client:HttpClient){}

  addAdmin(firstName:string,lastname :string,company:string,email:string)
  {
    const Query='mutation{createAdmin(name:"'+firstName+'",surname:"'+lastname+'",email:"'+email+'",company_name:"'+company+'"){name,surname,email,company_name,company_id}}';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
    }
    const object=this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query}),options)
    return object;
  }

  createUser(firstName:string,lastname :string,email:string,inviteCode:string):Observable<any>
  {
    const Query='mutation{createUser(name:"'+firstName+'",surname:"'+lastname+'",email:"'+email+'",inviteCode:"'+inviteCode+'"){name,surname,email,company_name,company_id,role,utilisation}}';

    console.log(Query);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
    }
    const object=this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }),options)

    console.log("Sheherezada");
    return object;

  }

  login(email:string,password:string):Observable<any>
  {
    const query='query{login(email:"'+email+'",password:"'+password+'"){name,surname,role,company_id,company_name}}';

    const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    }

    const obj= this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
    return obj;
  }

  /***
   * This service is used to register the user. It's running on the authentication Database
   * Hence why it's connecting to port 8080.
   * It's connecting to the container
  */

  registerUser(username:string,password:string):Observable<any>
  {
    const Query='mutation{registerUserGateway(username:"'+username+'",password:"'+password+'"){id,username,token,role}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const object=this.client.post<any>('http://localhost:8080/graphql',JSON.stringify({ query: Query }), options)
    return object;
  }

  /***
   * This service is used to register the Admin. It's running on the authentication Database
   * Hence why it's connecting to port 8080
   * It's connecting to the container
  */

  registerAdmin(username:string,password:string):Observable<any>
  {
    const Query='mutation{registerAdminGateway(username:"'+username+'",password:"'+password+'"){id,username,token,role}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const object=this.client.post<any>('http://localhost:8080/graphql', JSON.stringify({ query: Query }), options)
    return object;

  }



}
