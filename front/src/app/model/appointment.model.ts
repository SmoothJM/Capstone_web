export class AppointmentModel {
  constructor(public docEmail?: string,
              public cusEmail?: string,
              public appointmentDate?: Date,
              public applyDate?: Date,
              public status?: string) {
  }
}
