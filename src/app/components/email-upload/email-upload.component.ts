import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-email-upload',
  templateUrl: './email-upload.component.html',
  styleUrl: './email-upload.component.css'
})
export class EmailUploadComponent {
  selectedFile: File | null = null;
  dataSource = new MatTableDataSource<string>();
  displayedColumns: string[] = ['email'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      // this.http.post<string[]>('https://your-backend-url.onrender.com/api/emails/upload', formData)
      this.http.post<string[]>('https://loademailsfromangular.onrender.com/api/emails/load', formData)
        .subscribe(emails => {
          this.dataSource.data = emails;
          this.dataSource.paginator = this.paginator;
        });
    }
  }
}