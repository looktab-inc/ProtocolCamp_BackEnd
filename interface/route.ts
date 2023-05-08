import { IRoute } from 'express';

export interface route {
  dir: string;
  func: Function;
  method: string;
}
