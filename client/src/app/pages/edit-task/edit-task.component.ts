import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  private taskid: string;
  private listid: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.taskid = params.taskid;
      this.listid = params.listid;
    });
  }

  editTask(title: string) {
    console.log('jj');
    
    this.taskService.updateTask(this.listid,this.taskid,title).subscribe((resp: any) => {
      console.log(resp);
      this.router.navigate(['/list', this.listid]);
    });
  }

}
