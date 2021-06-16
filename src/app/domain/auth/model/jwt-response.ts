export interface JwtResponse {
  token: string;
  type: string;
  email: string;
  authorities: string[];
}
