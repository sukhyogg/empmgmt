import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api/api.service';
import { EmpModel } from './empdash.model';

@Component({
  selector: 'app-empdash',
  templateUrl: './empdash.component.html',
  styleUrls: ['./empdash.component.css']
})
export class EmpdashComponent {
  formValue !: FormGroup;
  empmodelobject: EmpModel = new EmpModel();  //creating object to post data or get data

  //get data
  empData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder, private api : ApiService) {}

  ngOnInit(): void {
    this.getempdata();
    this.formValue = this.formbuilder.group({
      firstname : [''],
      lastname: [''],
      email: ['']
    })
    
  }

  clickaddemp() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postempdata() {
    this.empmodelobject.firstname = this.formValue.value.firstname;
    this.empmodelobject.lastname = this.formValue.value.lastname;
    this.empmodelobject.email = this.formValue.value.email;

    this.api.postemp(this.empmodelobject).subscribe(res=>{
      console.log(res);
      alert("Employee Details Added Successfully !!");
      this.getempdata();
      let ref = document.getElementById("cancel");
      ref?.click();
      this.formValue.reset();
    },
    err=> {
      alert("Something went wrong");
    }
    )
  }
    getempdata() {
      this.api.getemp().subscribe(res=>{
        this.empData = res;
      })
    }

    delemp(row:any){
      this.api.deleteemp(row.id).subscribe(res=>{
        alert("Record Deleted Successfully");
        this.getempdata();
      })
    }
    onEdit(row:any) {
      this.showAdd = false;
      this.showUpdate = true;
      this.empmodelobject.id = row.id;
      this.formValue.controls['firstname'].setValue(row.firstname);
      this.formValue.controls['lastname'].setValue(row.lastname);
      this.formValue.controls['email'].setValue(row.email);

    }

    updateempdata() {
      this.empmodelobject.firstname = this.formValue.value.firstname;
      this.empmodelobject.lastname = this.formValue.value.lastname;
      this.empmodelobject.email = this.formValue.value.email;
      this.api.editemp(this.empmodelobject.id, this.empmodelobject).subscribe(res=>{
        alert("Updtaed Successfully !");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getempdata();
      })

    }

}
