import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {

  empForm:FormGroup;

  education:string[] = [
    'Diploma',
    'Graduate',
    'Post Graduate'
  ];

  constructor(
    private _formbuilder:FormBuilder,
    private _empService: EmployeeService, 
    private _dialogRef : MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any
    ){
    this.empForm = this._formbuilder.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      salary:'',
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit(){
    if(this.empForm.valid){
      this._empService.addEmployee(this.empForm.value).subscribe({
        next:(val:any) => {
          alert('Employee Data Added');
          this._dialogRef.close(true);

        },
        error:(err:any) => {
          console.log(err)
        }
      })
    }
  }

}
