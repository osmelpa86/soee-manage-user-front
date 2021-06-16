import {UserResponse} from "./user-response";

export interface UsersResponse {
  _embedded?: { userResponseList: UserResponse[] };
  _links: { self: { url: string } };
  page: { size: number, totalElements: number, totalPages: number, number: number };
}

export function getUsers(usersResponse: UsersResponse): UserResponse[] {
  const userResponses: UserResponse[] = [];
  if (usersResponse._embedded) {
    usersResponse._embedded.userResponseList.forEach(item => {
      userResponses.push(item);
    });
  }
  return userResponses;
}
