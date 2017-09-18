import { Component, OnInit, Input, OnChanges, Directive, ElementRef, Renderer, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFunctions } from './../../generics/form-functions.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  providers: [FormFunctions],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent implements OnInit, OnChanges {
    @Input() newFormObject: Object;
    public previewForm: FormGroup;
    public controls: Array<Object> = [];
    public errors: Object = {};

    constructor(private formFunctions: FormFunctions) { }
    
    ngOnInit() {
    }
    
    ngOnChanges() {
        this.previewForm = this.formFunctions.buildForm(this.newFormObject);
        for (let controlName in this.newFormObject) {
            if (this.controls.indexOf(this.newFormObject[controlName]) < 0) {
                this.controls.push(this.newFormObject[controlName]);
                this.previewForm.get(controlName).valueChanges.subscribe(
                    (value) => {
                        this.errors = this.formFunctions.getErrors(this.previewForm.get(controlName))
                    }
                )
            }
        }
    }

    console() {
        // this.getErrors();
        // console.log(this.controls)
        // console.log(this.previewForm)
    }
}
