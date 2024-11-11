import { Component, OnInit } from '@angular/core';
import { UrlService } from '../services/url.service';
import { UrlData } from '../model/url-data';

import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

export interface DialogData {
  animal: string;
  name: string;
}


import {ChangeDetectionStrategy, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import {MatSnackBar} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

const isValidUrl = (string: string) => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

@Component({
  selector: 'fetch-url-dialog',
  templateUrl: 'fetch-url-dialog.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class FetchUrlDialog {
  readonly dialogRef = inject(MatDialogRef<FetchUrlDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly urlData = this.data as unknown as UrlData;


  cancel() {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'create-url-dialog',
  templateUrl: 'create-url-dialog.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogOverviewExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  urlData?: UrlData;

  constructor(
    private urlService: UrlService,
  ) {}

  cancel() {
    this.dialogRef.close();
  }

  convertUrl(temp: HTMLInputElement) {
    const longUrl = temp.value;
    if (!longUrl.trim()) {
      this._snackBar.open("URL EMPTY!!", "OK", {
        verticalPosition: 'top', 
        horizontalPosition: 'right', 
        panelClass: 'snackbar',

      });
      return;

    }

    if (!isValidUrl(longUrl)) {
      this._snackBar.open("URL INVALID!!", "OK", {
        verticalPosition: 'top', 
        horizontalPosition: 'right', 
        panelClass: 'snackbar',

      });
      return;

    }

    this.urlService.postUrl(longUrl).subscribe(res => {
      temp.value = '';
      this.urlData = res;
      this.urlService.storeUrl(res);
      
    });
  }
}


@Component({
  selector: 'app-url',
  standalone: true,
  imports: [MatTableModule,MatButtonModule],
  templateUrl: './url.component.html',
  styleUrl: './url.component.scss',
  
})
export class UrlComponent implements OnInit {

  constructor(
    private urlService: UrlService,
  ) { }


  displayedColumns = ['shortUrl', 'action']

  openFetchDialog(url: UrlData) {
    this.urlService.getUrl(url.shortUrl).subscribe(res => {
      this.dialog.open(FetchUrlDialog, {data: res});
    })
  }

  ngOnInit() {
    this.dataSource = this.urlService.getUrls() || [];
    console.log(this.dataSource);
  }

  urlData: UrlData = {} as UrlData;
  dataSource: UrlData[] = [];

  getUrl(shortUrl: string) {
    this.urlService.getUrl(shortUrl).subscribe(res => this.urlData = res);
  }

  postUrl(longUrl: string) {
    this.urlService.postUrl(longUrl).subscribe(res => this.urlData = res);
  }

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      //data: {name: this.name(), animal: this.animal()},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }


}
