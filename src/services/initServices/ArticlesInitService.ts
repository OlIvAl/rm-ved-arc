import { AbstractInitService } from './AbstractInitService';
import { action, observable, runInAction } from 'mobx';
import { IArticleData } from '../../DataLayer/modules/articles/interfaces';
import DataLayer from '../../DataLayer';

export class ArticlesInitService extends AbstractInitService {
  @observable list: IArticleData[] = [];

  @action.bound protected async getData(): Promise<void> {
    try {
      const data = await DataLayer.getArticlesData();

      runInAction(() => {
        this.list = data;
      });
    } catch (e) {
      throw e;
    }
  }
}
