import { Photo } from './photo';
export interface User
{
  id:number;
  userName:string;
  knownAs:string;
  age:number;
  gender:string;
  created: Date;
  lasActive: Date;
  photoUrl:string;
  city:string;
  country:string;
  interests?:string;
  introduction?:string;
  lookingFor?:string;
  photos?: Photo[];
}
