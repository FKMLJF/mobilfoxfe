export class LoginDto {
  constructor(data: any) {
    this.userId = data?.userId;
    this.userName = data?.userName;
    this.password = data?.password;
    this.rememberMe = data?.rememberMe;
  }

  public userId?: number
  public userName?: string
  public password?: string
  public rememberMe?: boolean
}
