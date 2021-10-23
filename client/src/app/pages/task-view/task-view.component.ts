import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from 'src/app/models/list.module';
import { Task } from 'src/app/models/task.module';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {

  lists:List[];
  tasks:Task;
  listid:string;
  

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.listid = params.listid;
      if(this.listid){
        this.taskService.getTaskByListId(this.listid).subscribe((task:Task)=>{
          this.tasks = task;
        })
      }
    });

    this.taskService.getList().subscribe((response: List[]) => {
      this.lists = response;
    });
  }

  onTaskClick(task:Task) {
    this.taskService.complete(task)
    .subscribe((response: Task) => {
      task.iscompleted = !task.iscompleted;
    })
  }

}
