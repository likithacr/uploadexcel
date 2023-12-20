import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, public dialogref:MatDialogRef<NotifyComponent>) { }

  ngOnInit(): void {
  }

  closepopup(){
    this.dialogref.close();
  }

}
