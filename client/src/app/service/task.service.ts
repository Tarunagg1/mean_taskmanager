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

  deleteList(listid:string) {
    return this.webSerice.delete(`/list/${listid}`);
  }

  updateList(listid:string,title:string) {
    return this.webSerice.patch(`/list/${listid}`,{title:title});
  }


  // task
  getTaskByListId(id:string) {
    return this.webSerice.get(`/list/${id}/task`);
  }

  createTask(title:string,id:string) {
    return this.webSerice.post(`/list/${id}/task`,{title});
  }

  deletetask(listid:string,taskid:string) {
    return this.webSerice.delete(`/list/${listid}/task/${taskid}`);
  }

  updateTask(listid:string,taskid:string,title:string) {
    console.log('hbuy');
    return this.webSerice.patch(`/list/${listid}/task/${taskid}`,{title:title});
  }

  complete(task:Task) {
    console.log(task);    
    return this.webSerice.patch(`list/${task.listid}/task/${task._id}`,{iscompleted:!task.iscompleted})
  }

}
