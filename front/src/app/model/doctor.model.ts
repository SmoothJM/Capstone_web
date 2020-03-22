export class DoctorModel {
  constructor(public email?: string,
              public username?: string,
              public password?: string,
              public gender?: string,
              public addr?: string,
              public desc?: string,
              public photo?: string,
              public schedule?:[]) {
  }
}
