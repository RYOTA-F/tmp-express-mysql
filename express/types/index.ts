export interface getUsersResponse {
  id: number
  name: string
  age: number
}

export interface getPostsResponse {
  id: number
  user_id: number
  content: string
}

export interface IPutUserParams {
  id: number
  name: string
  age: number
}