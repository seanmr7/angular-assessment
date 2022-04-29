export class User {
  constructor(
    public email: string,
    public subscription: string,
    public password: string,
    public subscriptionStart: Date
  ) {
    this.email = email;
    this.subscription = subscription;
    this.password = password;
    this.subscriptionStart = subscriptionStart;
  }
}
