import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, ValidatorFn } from '@angular/forms';

import { FormFunctions } from './../generics/form-functions.service';
import { FormService } from 'app/services/form/form.service';

@Component({
    selector: 'app-create-form',
    templateUrl: './create-form.component.html',
    styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
    private addForm: FormGroup;    
    private addFormObject: Object = {
        label: {
            validators: [Validators.required]
        },
        type: {
            validators: [Validators.required]
        },
        selectOptions: {},
        required: {},
        maxLength: {},
        defaultValue: {}
    };
    public subscription;
    public newFormObject: Object = {};
    private isHiddenAlreadyExistsError: boolean = true;
    private isHiddenDropdownOptions: boolean = true;
    private label: string; 
    public errors: Object = {};
    public formIsEmpty: boolean = true;

    constructor(
        private formFunctions: FormFunctions,
        private formService: FormService
    ) { }

    ngOnInit() {
        this.createForm();
        this.subscriptions();
    }
    
    public subscriptions(): void {
        for (let controlName in this.addForm.controls) {
            this.addForm.get(controlName).valueChanges.subscribe(
                (value) => {
                    if (controlName !== 'selectOptions') {
                        if (controlName === 'type') {
                            this.dropdownOptions(value);
                        }
                        this.errors = this.formFunctions.getErrors(this.addForm.get(controlName));
                    }
                }
            )
        }
    }

    public dropdownOptions(value): void {
        let selectOptions = this.addForm.get('selectOptions');
        if (value && value === 'select') {
            selectOptions.setValidators(Validators.required);
            selectOptions.updateValueAndValidity();
            this.isHiddenDropdownOptions = false;
            if (!this.subscription) {
                this.subscription = selectOptions.valueChanges.subscribe(
                    (value) => {
                        this.errors = this.formFunctions.getErrors(selectOptions);
                    }
                )
            }
        }
        else {
            if(this.subscription) {
                this.subscription.unsubscribe();
                this.subscription = null;
            } 
            selectOptions.clearValidators();
            selectOptions.updateValueAndValidity();
            this.isHiddenDropdownOptions = true;
        }
    }

    public addControl(): void {
        this.label = this.addForm.get('label').value;
        if (!this.newFormObject.hasOwnProperty(this.label)) {
            this.newFormObject[this.label] = {};
            this.newFormObject[this.label]['label'] = this.label;
            
            if (this.addForm.get('defaultValue').value) {
                this.newFormObject[this.label]['default'] = this.addForm.get('defaultValue').value;
            }
            else {
                this.newFormObject[this.label]['default'] = '';
            }
            this.newFormObject[this.label]['maxlength'] = +this.addForm.get('maxLength').value;
            this.newFormObject[this.label]['type'] = this.addForm.get('type').value;
            if (this.addForm.get('selectOptions').value) {
                let splitted = this.addForm.get('selectOptions').value.split(',');
                this.newFormObject[this.label]['selectOptions'] = splitted;
            }
            else {
                this.newFormObject[this.label]['selectOptions'] = [];
            }
            let validators: Array<ValidatorFn> = [];
            if (this.addForm.get('required').value) {
                validators.push(Validators.required);
            }
            this.newFormObject[this.label]['validators'] = validators;
            this.newFormObject = Object.assign({}, this.newFormObject);
            this.isHiddenAlreadyExistsError = true;
            this.addForm.reset();
            this.errors = {};
            this.formIsEmpty = false;
        }
        else {
            this.isHiddenAlreadyExistsError = false;
        }
        
    }

    public saveForm(): void {
        this.formService.formSave(this.newFormObject).subscribe(
            (data) => {
                console.log(data);
            }
        )
    }
    private createForm(): void {
        this.addForm = this.formFunctions.buildForm(this.addFormObject);
    }
}
