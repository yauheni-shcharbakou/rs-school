import { IIdField } from '../interfaces/id-field.interface';
import { IBaseRepository } from '../modules/repository/base/base.repository.interface';

export abstract class BaseService<
  Entity extends IIdField,
  Create extends object = Partial<Entity>,
> {
  protected readonly repository: IBaseRepository<Entity, Create>;

  async findAll(): Promise<Entity[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Entity | undefined> {
    return this.repository.findById(id);
  }

  async create(data: Create): Promise<Entity> {
    return this.repository.create(data);
  }

  async deleteById(id: string): Promise<boolean> {
    return this.repository.deleteById(id);
  }
}
