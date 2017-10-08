// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SkillModel } from '../models/skills.model';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SkillsService {
     // Resolve HTTP using the constructor
     constructor (private http: Http) {}
     // private instance variable to hold base url
     private skillsUrl = 'api/getSkills';

     // Fetch all existing skills
     getSkills() : Observable<SkillModel[]> {

         // Using get request
         return this.http.get(this.skillsUrl)
          // ...and calling .json() on the response to return data
            .map((res:Response) => res.json().data)
            //...errors if any
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }

}
