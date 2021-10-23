import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';
import { List } from '../../models/list.module';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService:TaskService,private router:Router) { }

  ngOnInit(): void {
  }

  createList(title:string){
    this.taskService.createList(title).subscribe((response:List) => {
      // reditect to /list/response._id
      this.router.navigate(['/list',response._id])
    })
  }



}
