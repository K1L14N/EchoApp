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
			let lastco1 = JSON.stringify(data);
      let lastco2 = JSON.parse(lastco1);
      this.LLogin = "Derniere connexion le "+lastco2.day+"/0"+(lastco2.month+1)+" à "+lastco2.hours+" : "+lastco2.minutes;
    });

  }
}
