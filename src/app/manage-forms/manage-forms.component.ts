import { Component, OnInit } from '@angular/core';
import { FormService } from 'app/services/form/form.service';

@Component({
  selector: 'app-manage-forms',
  templateUrl: './manage-forms.component.html',
  styleUrls: ['./manage-forms.component.scss']
})
export class ManageFormsComponent implements OnInit {

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.formService.getForms()
      .subscribe(data => {
        console.dir(data);
      })
  }

}
