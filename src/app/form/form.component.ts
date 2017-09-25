import { Component, OnInit } from '@angular/core';
import { FormService } from 'app/services/form/form.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public form;
  constructor(private formService: FormService,
              private router: Router,
              private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.getForm(params.id)
      }
    })
  }

  private getForm(id: String) {
    this.formService.getForm(id)
      .subscribe(data => {
        console.log(data);
        this.form = data;
      })
  }
}
