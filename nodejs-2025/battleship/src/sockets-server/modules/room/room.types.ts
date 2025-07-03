export interface IRoomAddUserData {
  indexRoom: string;
}

export interface IRoomAvailableData {
  roomId: string;
  roomUsers: { name: string; index: string }[];
}
