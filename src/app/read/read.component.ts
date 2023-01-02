import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit{
  date: any;
  currentdate: any;
  
  constructor(private api:ApiserviceService) {

   }
  readSubject:any;
  successMsg: any;

  ngOnInit(): void {
   this.getAllSubject();
}

// delete Id
deleteId(id:any){
  // console.log(id,"selected ID")
  this.api.deleteData(id).subscribe((res)=>{
    console.log(res,'deleted Id No');
    this.successMsg =res.message;
    this.getAllSubject();
  })
}
    getAllSubject(){
       //instance load all data
       this.api.getAllSubject().subscribe((res)=>{
        console.log('Get All Data',res);
        this.readSubject =res.data;
        // console.log("length:",this.readSubject.length);
        for(let i=0; i<this.readSubject.length; i++)
        this.currentdate = new Date(this.readSubject[i].DATA)
       
        // var date = new Date("2013-03-10T02:00:00Z");
        // date.toISOString().substring(0, 10);
      })
      }
  }

  // for(let i=0; i<this.readSubject.length; i++)