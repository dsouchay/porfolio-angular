export interface IPageWorkExperience{
  company: string;
  info: string[];
  period: string;
  position: number;
}
export interface IPageRRSS{
  icon: string;
  info: string;
  position: number;
  url: string;
  color: string;
}
export interface IPageBasicInformation{
  label: string;
  value: string;
}
export interface IPage{
  id?: string;
  about: string[];
  about_text: string;
  basic_information: IPageBasicInformation[];
  footer: string;
  rrss: IPageRRSS[];
  title: string;
  work_experience: IPageWorkExperience[];
}
