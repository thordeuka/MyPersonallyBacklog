import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalIdentifierService {

  private nextId: number;
  
  constructor() 
  { 
    this.nextId = 1;
  }

  public fetchNextId(): number{
    return this.nextId++;
  }
  public showNextId(): number{
    return this.nextId;
  }

}
