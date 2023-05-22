export interface Film {
  image: string;
  title: string;
  year: number;
  director: string;
  time: number;
  trailer: string;
  resolution: string;
  information: string;
  id: string;
  type: string;
}
export interface RouterQuery {
  type: string;
  title: string;
}
export interface banner {
  image: string;
}
export interface NavItem {
  key: string;
  name: string;
}
export interface FavorFilmList {
  userID: string;
  id: string;
  filmList: string[];
}
export interface User {
  status: boolean;
}
export interface News {
  id: string;
  img: string;
  title: string;
  description: string;
  by: string;
}
