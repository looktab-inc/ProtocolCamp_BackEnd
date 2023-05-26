export interface createForm {
  table: string;
  data: object;
}

export interface findForm {
  table: string;
  data?: object;
}

export interface updateForm {
  table: string;
  where: object;
  data: object;
}
