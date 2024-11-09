// button
// button size 타입 정의
type ButtonSize =
  | 'webBig'
  | 'webMid'
  | 'webRegular'
  | 'webSmall'
  | 'webTiny'
  | 'appBig'
  | 'appMid'
  | 'appRegular';

// button variant style 타입 정의
type ButtonColor = 'lightBlue' | 'blue' | 'gray' | 'red' | 'white';

interface Apartment {
  aptname: string;
  aptImg: string;
  location: string;
  block: number;
  household: number;
}
