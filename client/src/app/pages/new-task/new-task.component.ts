import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  listid: string;

  constructor(
    private taskService: TaskService,
    private router: ActivatedRoute,
    private route:Router
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.listid = params['listid'];
    });
  }

  createTask(title: string) {
    this.taskService.createTask(title,this.listid).subscribe((data) => {
      this.route.navigate(['/list',this.listid]);
    });
  }
}
