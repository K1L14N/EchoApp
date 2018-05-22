import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { UserService } from '../../services/user.service';

@Component({
	moduleId: module.id,
	selector: 'contacts',
	templateUrl: './contacts.component.html',
	providers: [ContactsService, UserService],
	styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {

	contacts = [];
	present: Boolean = false;

	constructor(
		private contactsService: ContactsService,
		private userService: UserService) {	}

	ngOnInit() { }

	findContacts() {
		this.contactsService.selectContactToAdd()
		.then(() => {
			this.contacts.forEach(element => {
				if (element == this.contactsService.newContact) {
					this.present = true;
				}
			})
			if (!this.present) {
				this.contacts.push(this.contactsService.newContact);
				console.log(this.contacts);

			} else {
				alert("Ce contact est déjà présent dans la liste");
				console.log("Déjà présent dans la liste");
				this.present = false;
			}
		})
	}

}