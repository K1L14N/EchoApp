import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Echo } from '../../../models/echo';
import { EchoListService } from '../../../services/echo-list.service';

@Component({
    moduleId: module.id,
    selector: 'list-single',
    templateUrl: './list-single.html',
    styleUrls: ["./list-single-common.css", "./list-single.css"]
})

export class ListSingleComponent implements OnInit {

    echo: Echo;
    showImage: Boolean = false;

    constructor(private echoListService: EchoListService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this.echo = new Echo();
        const id = this.route.snapshot.params['id'];
        this.echoListService.getEcho(+id).then(
            (echo: Echo) => {
                this.echo = echo;
            }
        );
    }

    refreshList(args) {
        var pullRefresh = args.object;
        setTimeout(function () {
           pullRefresh.refreshing = false;
        }, 1000);
      }

    onTapAdd() {
        this.router.navigate(['/create']);
    }

    toggleShowImg() {
        this.showImage = !this.showImage;
    }
}