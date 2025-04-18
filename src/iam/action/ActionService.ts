import { Inject, Injectable } from '@nestjs/common';
import { IActionRepository } from './IActionRepository';

@Injectable()
export class ActionService {
  constructor(@Inject('ActionRepo') private actionRepo: IActionRepository) {}

  async getActions() {
    const [features, actions] = await Promise.all([
      this.actionRepo.getAllFeautures(),
      this.actionRepo.getAllActions(),
    ]);

    const featureMap: {
      [featureId: string]: {
        id: string;
        parentId: string;
        name: string;
        description: string;
        actions: {
          id: string;
          featureId: string;
          name: string;
          description: string;
          method: string;
          path: string;
        }[];
      };
    } = features.reduce((currentFeatureMap, feature) => {
      currentFeatureMap[feature.id] = {
        ...feature,
        actions: [],
      };

      return currentFeatureMap;
    }, {});

    actions.forEach((action) => {
      if (!featureMap[action.featureId]) {
        return;
      }

      featureMap[action.featureId].actions.push(action);
    });

    return Object.values(featureMap);
  }
}
