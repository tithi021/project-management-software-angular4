// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { TaskModel } from '../models/tasks.model';
import { ProgressTaskModel } from '../models/progress-task.model';
import { CompletedTaskModel } from '../models/completed-task.model';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TaskService {
     // Resolve HTTP using the constructor
     constructor (private http: Http) {}
     // private instance variable to hold base url
     private taskUrl = 'api/getTasks';
     private inProgressTaskUrl = 'api/inProgressTask';
     private completedTaskUrl = 'api/completedTask';
     // Fetch all existing task
     getTask() : Observable<TaskModel[]> {

         // Using get request
         return this.http.get(this.taskUrl)
          // ...and calling .json() on the response to return data
            .map((res:Response) => res.json().data)
            //...errors if any
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }

    //  Fetch all in progress tasks
    getInProgressTask() : Observable<ProgressTaskModel[]> {

         // Using get request
         return this.http.get(this.inProgressTaskUrl)
          // ...and calling .json() on the response to return data
            .map((res:Response) => res.json().data)
            //...errors if any
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }
    
    // Fetch completed task
    getCompletedTask() : Observable<CompletedTaskModel[]> {

         // Using get request
         return this.http.get(this.completedTaskUrl)
          // ...and calling .json() on the response to return data
            .map((res:Response) => res.json().data)
            //...errors if any
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }

    //  Add New task
    addTask (body: Object): Observable<TaskModel[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.taskUrl, body, options) // ...using post request
                         .map((res:Response) => res.json().data) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    //  Add task in-progress
    addTaskInProgress (body: Object): Observable<ProgressTaskModel[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
       
        return this.http.post(this.inProgressTaskUrl, body, options) // ...using post request
                         .map((res:Response) => res.json().data) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }  

    //  Add task complete
    addTaskInComplete (body: Object): Observable<CompletedTaskModel[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.completedTaskUrl, body, options) // ...using post request
                         .map((res:Response) => res.json().data) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }  
}
