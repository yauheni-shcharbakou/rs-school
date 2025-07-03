import { IIdField } from '../../../interfaces/id-field.interface';
import { IBaseRepository } from './base.repository.interface';

export abstract class BaseInMemoryRepository<
  Entity extends IIdField,
  Create extends object = Partial<Entity>,
  Filter extends object = Partial<Entity>,
  Update extends object = Partial<Entity>,
> implements IBaseRepository<Entity, Create, Filter, Update>
{
  protected readonly entityById = new Map<string, Entity>();

  abstract create(data: Create): Promise<Entity>;

  async existsById(id: string): Promise<boolean> {
    return this.entityById.has(id);
  }

  async findAll(): Promise<Entity[]> {
    return Array.from(this.entityById.values());
  }

  async findById(id: string): Promise<Entity | undefined> {
    return this.entityById.get(id);
  }

  async updateById(
    id: string,
    data: Update | ((entity: Entity) => Update),
  ): Promise<Entity | undefined> {
    const entity = this.entityById.get(id);

    if (!entity) {
      return;
    }

    const updateData = typeof data === 'function' ? data(entity) : data;
    return Object.assign(entity, updateData);
  }

  async updateMany(filter: Filter, updateData: Update): Promise<void> {
    const entities = await this.findAll();
    const filterKeys = Object.keys(filter);

    entities.forEach((entity) => {
      const isValidEntity = filterKeys.every((key) => {
        return entity[key] === filter[key];
      });

      if (!isValidEntity) {
        return;
      }

      Object.assign(entity, updateData);
    });
  }

  async deleteById(id: string): Promise<boolean> {
    if (!this.entityById.has(id)) {
      return false;
    }

    this.entityById.delete(id);
    return true;
  }
}
