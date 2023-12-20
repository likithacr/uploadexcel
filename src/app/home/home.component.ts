import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as Papa from 'papaparse';
import { UserService } from '../user.service';
import { S3 } from 'aws-sdk';
import * as AWS from 'aws-sdk';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotifyComponent } from '../services/notify/notify.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private datepipe: DatePipe, private userService: UserService, private authservice: AuthService, private router: Router, public dialog: MatDialog) { }

  

  file!: File;
  uploadMessage!:string;
  fname!:any
  filename!: string;
  newfilename!: string;
  name!: string;
  jdata!: {};
  payloaddata!: {};
  check!:{};
  showspinner : boolean = false;

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
        this.dialog.open(NotifyComponent,{data:{message:this.uploadMessage}, height: '250px',
        width: '400px'})
        //dialogref.afterClosed().subscribe(result=>{console.log("Popup closed")})
      }
      else{
        this.uploadMessage="";
        let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyyh:mm:ss');
        this.newfilename=this.filename+currentDateTime
        console.log(this.newfilename.replace(/\s/g, ""))
        this.name=this.newfilename;
    
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          let csvData = fileReader.result!.toString();
          this.csvToJson(csvData);
        }
        fileReader.readAsText(this.file);
      }
  }


  csvToJson(csvData: string): void {
    Papa.parse(csvData, {
      header: true,
      complete: (result) => {
        console.log('Parsed: ', result.data);
        this.jdata = result.data;
       
        let filepayload ={ 
          jsondata : this.jdata
        }
      
        console.log(filepayload)
        console.log(Object.keys(this.jdata).length)
        let datalen=Object.keys(this.jdata).length;
        if(datalen==0)
        {
          this.uploadMessage="Please make sure the file has minimum 1 row of data";
          this.dialog.open(NotifyComponent,{data:{message:this.uploadMessage}, height: '250px',
        width: '400px'})
        }
        else if(datalen>8){
          this.uploadMessage="Please make sure the file has maximum 8 rows of data";
          this.dialog.open(NotifyComponent,{data:{message:this.uploadMessage}, height: '250px',
        width: '400px'})
        }
        else{

          console.log("Data uploaded")
          this.showspinner=true;
          this.userService.sendData(filepayload).subscribe((data) => {
            this.showspinner=false;
          console.log("data from response"+JSON.stringify(data));
          console.log(JSON.parse)

          let mailpayload = {
            to : [this.userService.usermail],
            subject: "Data upload status",
            body_html: "<html><p>Data from csv file is uploaded.</p></br></br><p>"+data["data"]["success"]+" are successful</p></br><p>"+data["data"]["failed"]+" are failed</p></br></html>",
            body_text: "Thank you"
          }
          console.log(mailpayload)
          console.log("Success:"+data["data"]["success"])
          if(data['code']==200){
            this.uploadMessage="Data of "+data["data"]["success"]+" rows are uploaded successfully and mail has been sent."
            this.dialog.open(NotifyComponent,{data:{message:this.uploadMessage}, height: '250px',
            width: '400px'})
            this.userService.sendMail(mailpayload).subscribe((data) => {
              console.log(JSON.stringify(data));
            })
          }
          else{
            this.uploadMessage=data['message']
          }
        })
        }
      }
    });  
  }

  logout(){
    this.authservice.isAuthenticated=false;
    console.log(this.authservice.isAuthenticated);
    this.router.navigate(['login']);
  }


}
