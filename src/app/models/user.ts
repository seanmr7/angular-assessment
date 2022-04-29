export class User {
  constructor(
    public email: string,
    public subscription: string,
    public password: string,
    public passwordVerification: string,
    public startDate: Date
  ) {}
}
