import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  

  displayedColumns: string[] = [
    'id',
     'firstName',
      'lastName',
       'email',
       'dob',
       'gender',
       'education',
       'company',
       'experience',
       'salary',
       'action',
      ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog, private _empService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployee();
  }

  openAddEditEmpForm(){
    const dialogRef = this.dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val){
          this.getEmployee();
        }
      },
    })
  }

  getEmployee(){
    this._empService.getEmployee().subscribe({
      next:(res)=>{
        this.dataSource  = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator=this.paginator;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  deleteEmployee(id:number){
    this._empService.deleteEmployee(id).subscribe({
      next:(res)=>{
        
        alert('Employee Deleted')
        this.getEmployee();
      },
      error:(err) => {
        console.log(err)
      }
    })
  }

  editEmployee(data:any){
    this.dialog.open(EmpAddEditComponent, {
      data:data,
    });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
