import { IIdField } from '../../../interfaces/id-field.interface';

export interface IBaseRepository<
  Entity extends IIdField,
  Create extends object = Partial<Entity>,
  Filter extends object = Partial<Entity>,
  Update extends object = Partial<Entity>,
> {
  existsById(id: string): Promise<boolean>;
  findAll(): Promise<Entity[]>;
  findById(id: string): Promise<Entity | undefined>;
  create(data: Create): Promise<Entity>;
  updateById(
    id: string,
    updateData: Update | ((entity: Entity) => Update),
  ): Promise<Entity | undefined>;
  updateMany(filter: Filter, updateData: Update): Promise<void>;
  deleteById(id: string): Promise<boolean>;
}
