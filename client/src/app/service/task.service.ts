import { Injectable } from '@angular/core';
import { Task } from '../models/task.module';
import { WebrequestService } from './webrequest.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private webSerice: WebrequestService) {}

  createList(title: string) {
    return this.webSerice.post('/list', { title: title });
  }

  getList() {
    return this.webSerice.get('/list');
  }
  

  // task
  getTaskByListId(id:string) {
    return this.webSerice.get(`/list/${id}/task`);
  }

  createTask(title:string,id:string) {
    return this.webSerice.post(`/list/${id}/task`,{title});
  }

  complete(task:Task) {
    console.log(task);    
    return this.webSerice.patch(`list/${task.listid}/task/${task._id}`,{iscompleted:!task.iscompleted})
  }

}
