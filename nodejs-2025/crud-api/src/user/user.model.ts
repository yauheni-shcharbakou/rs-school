export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type UserCreate = Omit<User, 'id'>;
