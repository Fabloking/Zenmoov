import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/dataservice';
import { ToastrService } from 'ngx-toastr';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  title = 'Zenmoov';
  email;
  password;
  loggedIn;
  users;


  constructor(private dataservice: DataService,
    private toastr: ToastrService) { }


    
  ngOnInit() {
    this.dataservice.loggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
  }

  logout(){
    this.dataservice.logout()
    .subscribe(() => {
      this.loggedIn = false;
    });
  }

  doLogin() {
    this.dataservice.doLogin(this.email, this.password)
      .subscribe((resp: any) => {
        if(resp.loggedIn){
          this.loggedIn = true;
          this.toastr.success(resp && resp.user && resp.user.name ? `Welcome ${resp.user.name}` : 'Logged in!');
        }else{
          console.log('ERREUR DE CO A GERER',resp);
        }
      }, (errorResp) => {
        this.loggedIn.next(false);
        errorResp.error ? this.toastr.error(errorResp.error.errorMessage) : this.toastr.error('An unknown error has occured.');
      });;
  }

}
