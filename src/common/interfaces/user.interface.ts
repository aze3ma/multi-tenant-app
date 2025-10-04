export interface JwtUser {
  id: string;
  email: string;
  role: string;
  orgId: string;
}

export interface RequestWithUser extends Request {
  user: JwtUser;
}
