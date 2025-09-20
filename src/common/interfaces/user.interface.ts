export interface JwtUser {
  id: string;
  email: string;
  role: string;
  organizationId: string;
}

export interface RequestWithUser extends Request {
  user: JwtUser;
}
