import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { S3 } from 'aws-sdk';
import * as AWS from 'aws-sdk';
import * as Papa from 'papaparse';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private datepipe: DatePipe) { }


  file!: File;

  // onFileSelected(event) {
  //   this.file = (event.target.files[0]);
  // }

  // onUpload() {
  //   AWS.config.update({
  //     accessKeyId: 'AKIAZ7EJRWGLFW3AYZPV',
  //     secretAccessKey: '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',
  //     region: 'us-east-1'
  //   });
  // FOLDER = 'uploaded_data/';
  // BUCKET = 'wtsops-rd';

  //   s3 = new AWS.S3();
  //   private getS3Bucket(): any {
  //     const bucket = new S3(
  //       {
  //         accessKeyId: 'AKIAZ7EJRWGLFW3AYZPV',
  //         secretAccessKey: '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',
  //         region: 'us-east-1'
  //       }
  //     );
  
  //     return bucket;
  //   }

  //   getFiles() {
      
  
  //     const params = {
  //       Bucket: this.BUCKET,
  //       Prefix: this.FOLDER
  //     };
  
  //     this.getS3Bucket().listObjects(params, function (err: string, data: { Contents: any; }) {
  //       if (err) {
  //         console.log('There was an error getting your files: ' + err);
  //         return;
  //       }
  
  //       console.log('Successfully get files.', data);
  
  //       const fileDatas = data.Contents;
  //     });
  //   }
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
  

    // s3.listObjects({

    //   Bucket:'wtsops-rd',
    
    // }, (err: { stack: any; }, data: any) {
    
    //   if (err) {
    
    //     console.log(err, err.stack);
    
    //   } else {
    
    //     console.log(data);
    
    //   }
    // });

  //   //this.fname=document.getElementById('csvFile');
  //   // this.filename = this.fname.files.item(0).name;
  //   // if(this.filename.length>15){
  //   //   this.uploadMessage="Please rename the file with less than 15 characters"
  //   // }
  //   // else{
  //   //   this.uploadMessage="";
  //   // }
  // }

  fname!:any
  filename!: string;
  newfilename!: string;

  // showname(){
  //   console.log("showname")
    
  //   // console.log(this.fname.files.item(0).name)
  //   // console.log(this.fname.files.item(0).type)
  //   // console.log(this.fname.files.item(0).size)

        
  // }
  
  onFileChange(event:Event) {
    let target=event.target as HTMLInputElement;
    if(target.files && target.files.length>0)
    {
    this.file = target.files[0];
    }
  }
 

  uploadS3(){
    this.fname=document.getElementById('csvFile'); 
    this.filename = this.fname.files.item(0).name;
    
     if(this.filename.length>15){
      this.uploadMessage="Please rename the file with less than 15 characters to upload the file"
    }
    else{
      this.uploadMessage="";
      let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
      this.newfilename=this.filename+currentDateTime
      console.log(this.newfilename.replace(/\s/g, ""))
    }
    
    
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let csvData = fileReader.result!.toString();
      this.csvToJson(csvData);
    }
    fileReader.readAsText(this.file);
  }

  csvToJson(csvData: string): void {
    Papa.parse(csvData, {
      header: true,
      complete: (result) => {
        console.log('Parsed: ', result.data);
      }
    });

//     let csvToJson = require('convert-csv-to-json');

//     let json = csvToJson.getJsonFromCsv(this.fname.files.item(0));
//     for(let i=0; i<json.length;i++){
//     console.log(json[i]);
// }
     
    
  }


}
