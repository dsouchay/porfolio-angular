export interface IEducationInfo{
  location: string;
  title: string;
  data: string[];
}
export interface IEducation{
  id?: string;
  position: number;
  period: string;
  title: string;
  info: IEducationInfo;
}
