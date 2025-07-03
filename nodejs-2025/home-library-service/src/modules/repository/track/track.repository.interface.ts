import {
  ITrack,
  ITrackCreate,
  ITrackFilter,
} from '../../../models/track.model';
import { IBaseRepository } from '../base/base.repository.interface';

export interface ITrackRepository
  extends IBaseRepository<ITrack, ITrackCreate, ITrackFilter, ITrackFilter> {}
