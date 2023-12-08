import { Component, OnInit } from '@angular/core';
import { S3 } from 'aws-sdk';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor() { }

  // file: File;

  // onFileSelected(event) {
  //   this.file = (event.target.files[0]);
  // }

  // onUpload() {
  //   AWS.config.update({
  //     accessKeyId: 'AKIAZ7EJRWGLFW3AYZPV',
  //     secretAccessKey: '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',
  //     region: 'us-east-1'
  //   });

  //   const s3 = new AWS.S3();
  //   const params = {
  //     Bucket: 'wtsops-rd',
  //     Key: this.file?.name,
  //     Body: this.file
  //   };

  //   s3.upload(params, function(err: any, data: { Location: any; }) {
  //     if (err) {
  //       console.log('Error', err);
  //     } if (data) {
  //       console.log('Upload Success', data.Location);
  //     }
  //   });
  // }
 

  uploadMessage!:string;



  // uploadS3(){
  //   // AWS.config.update({

  //   //   accessKeyId: 'YOUR_ACCESS_KEY_ID',
    
  //   //   secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    
  //   // });

  //   // this.fname=document.getElementById('csvFile'); 
  //   // this.filename = this.fname.files.item(0).name;
  //   // console.log(this.filename)
  //   const s3 = new AWS.S3({
  //     accessKeyId: 'AKIAZ7EJRWGLFW3AYZPV',
  //     secretAccessKey: '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',
  //     region: 'us-east-1'
  //   });


  //   // const params = {
  //   //   Bucket: 'wtsops-rd',
  //   //   Key: this.filename,
  //   //   Body: this.fname.files.item(0)
  //   // };    
    
  //   // s3.upload(params, function(err: any, data: { Location: any; }) {
  //   //   if (err) {
  //   //     throw err;
  //   //   }
  //   //   console.log(`File uploaded successfully. ${data.Location}`);
  //   // });
  

  //   s3.listObjects({

  //     Bucket: 'wtsops-rd',
    
  //   }, function(err, data) {
    
  //     if (err) {
    
  //       console.log(err, err.stack);
    
  //     } else {
    
  //       console.log(data);
    
  //     }
    
  //   });

  //   //this.fname=document.getElementById('csvFile');
  //   // this.filename = this.fname.files.item(0).name;
  //   // if(this.filename.length>15){
  //   //   this.uploadMessage="Please rename the file with less than 15 characters"
  //   // }
  //   // else{
  //   //   this.uploadMessage="";
  //   // }
  // }

  // fname!:any
  // filename!: string;

  // showname(){
  //   console.log("showname")
    
  //   // console.log(this.fname.files.item(0).name)
  //   // console.log(this.fname.files.item(0).type)
  //   // console.log(this.fname.files.item(0).size)

        
  // }


}
