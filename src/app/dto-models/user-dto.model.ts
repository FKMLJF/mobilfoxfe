
export class UserDto {
  constructor(user: any) {
      this.userId = user?.userId;
      this.userName = user?.userName;
      this.rememberMe = user?.rememberMe;
      this.role = user?.role;
  }

  public userId: number;
  public userName?: string;
  public role?: number;
  public rememberMe?: boolean;
}
