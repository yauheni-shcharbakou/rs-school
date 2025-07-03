import { User } from '../user';
import { Room } from './room.model';
import { IRoomAvailableData } from './room.types';

export class RoomService {
  private readonly roomById: Map<string, Room> = new Map();

  isPartOfRoom(userId: string): boolean {
    return Array.from(this.roomById.values()).some((room) =>
      room.getUsers().some((user) => user.id === userId),
    );
  }

  create(user: User): Room {
    const room = new Room(user);
    this.roomById.set(room.id, room);
    return room;
  }

  getAvailableRooms(userId: string): IRoomAvailableData[] {
    return Array.from(this.roomById.values()).reduce(
      (acc: IRoomAvailableData[], room: Room) => {
        if (room.isAvailableFor(userId)) {
          acc.push(room.toJSON());
        }

        return acc;
      },
      [],
    );
  }

  addToRoom(roomId: string, user: User): Room {
    const room = this.roomById.get(roomId);

    if (!room) {
      throw new Error('Room not found');
    }

    room.addUser(user);
    return room;
  }

  deleteById(roomId: string): void {
    this.roomById.delete(roomId);
  }
}
