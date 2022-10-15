export class createApplication {
  private userId: number;
  private applicationId: number;

  constructor(userId: number, applicationId: number) {
    this.userId = userId;
    this.applicationId = applicationId;
  }

  getUserId() {
    return this.userId;
  }
  getApplicationId() {
    return this.applicationId;
  }
}
