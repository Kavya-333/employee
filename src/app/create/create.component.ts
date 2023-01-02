import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit{

  // professorForm!: FormGroup

  constructor(private api:ApiserviceService, private router:ActivatedRoute) { }

  successMsg:any;
  errMsg:any;
  getparamid:any;

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid){
      this.api.getsingleData(this.getparamid).subscribe((res)=>{
        console.log(res,'selected update data')
        this.professorForm.patchValue({
          subjectname:res.data[0].subjectname,
          professor:res.data[0].professor,
          mobile:res.data[0].mobile
        })
      })
    }
  }
  professorForm = new FormGroup({
    'subjectname':new FormControl('',Validators.required),
    'professor':new FormControl('',Validators.required),
    'mobile':new FormControl('',Validators.required),
  })

  professorSubmit(){
      // console.log(this.professorForm.value);
      if(this.professorForm.valid){
        console.log(this.professorForm.value);
        this.api.createData(this.professorForm.value).subscribe((res)=>{
          console.log(res,'Data added success')
          this.professorForm.reset();
          this.successMsg = res.message;
        })
      }
      else{
        this.errMsg ='All fields are required';
  }

}

//updateprofessor
updateprofessor(){
  // console.log(this.professorForm.value);
  if(this.professorForm.valid){
    this.api.updateData(this.professorForm.value,this.getparamid).subscribe((res)=>{
      console.log(res,'Data update successful');
      this.successMsg = res.message;
    })
  }else{
    this.errMsg="All fields Are required"
  }
}
}