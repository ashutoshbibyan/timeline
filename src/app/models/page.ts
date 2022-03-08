import { Timeline } from './timeline';

export interface Page {

  pageNo:number;
  pageSize:number;
  noOfElements: number;
  content: Timeline [];

  getContent(): any[];

}
