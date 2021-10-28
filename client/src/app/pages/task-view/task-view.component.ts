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
  lists: List[];
  tasks: Task;
  listid: string;
  selectedListId: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.listid = params.listid;
      if (this.listid) {
        this.selectedListId = params.listid;
        this.taskService
          .getTaskByListId(this.listid)
          .subscribe((task: Task) => {
            this.tasks = task;
          });
      }
    });

    this.taskService.getList().subscribe((response: List[]) => {
      this.lists = response;
    });
  }

  onTaskClick(task: Task) {
    this.taskService.complete(task).subscribe((response: Task) => {
      task.iscompleted = !task.iscompleted;
    });
  }

  onDeleteListClick() {
    if (this.listid) {
      this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
        this.router.navigate(['/list']);
      });
    } else {
      alert('Select list id');
    }
  }

  onTaskListClick() {
    if (this.listid) {
      this.router.navigate(['/editlist', this.listid]);
    } else {
      alert('Select list id');
    }
  }

  deleteTask(taskid: string) {
    console.log(taskid);
    this.taskService
      .deletetask(this.selectedListId, taskid)
      .subscribe((resp: any) => {
        this.router.navigate(['/list', taskid]);
      });
  }
}
