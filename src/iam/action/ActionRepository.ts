import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActionEntity } from '../../postgre/entities/ActionEntity';
import { FeatureEntity } from '../../postgre/entities/FeatureEntity';
import { IActionRepository } from './IActionRepository';

@Injectable()
export class ActionRepository implements IActionRepository {
  constructor(
    @Inject(FeatureEntity)
    private featureModel: Repository<FeatureEntity>,
    @Inject(ActionEntity)
    private actionModel: Repository<ActionEntity>,
  ) {}

  async getAllFeautures(): Promise<
    { id: string; parentId: string; name: string; description: string }[]
  > {
    const features = await this.featureModel.find({
      select: {
        id: true,
        parentId: true,
        name: true,
        description: true,
      },
    });

    return features;
  }

  async getAllActions(): Promise<
    {
      id: string;
      featureId: string;
      name: string;
      description: string;
      method: string;
      path: string;
    }[]
  > {
    const actions = await this.actionModel.find({
      select: {
        id: true,
        featureId: true,
        name: true,
        description: true,
        method: true,
        path: true,
      },
    });

    return actions;
  }
}
