import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from "../../models/user";

@Component({
  moduleId: module.id,
  selector: 'profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  providers: [UserService]
})

export class ProfilComponent implements OnInit {

  _user: any = new User();
  LLogin: any = "";

  constructor(private userService: UserService) {
  }


  ngOnInit() {
    this._user = this.userService.getUser();
    this.userService.getLastLogin().then((data) => {
			console.log(JSON.stringify(data))
      var lastco = JSON.parse(JSON.stringify(data)).toString();
      // this.LLogin = "Derniere connexion le "+lastco.day.toString()+" "+latco.month.toString()+" a "+lastco.hours.toString()+" : "+lastco.minutes.toString()+" : "+lastco.seconds.toString();
      console.log(JSON.stringify(lastco));
    });

  }
}
