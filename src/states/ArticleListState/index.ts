import { action, computed, runInAction } from 'mobx';
import { IStore } from '../../entities/stores/interfaces';
import { IArticleModel } from '../../entities/models/interfaces';
import { ArticlesInitService } from '../../services/initServices/ArticlesInitService';
import { ArticleModel } from '../../entities/models/ArticleModel';

export class ArticleListState {
  @computed loading(): boolean {
    return this.articlesInitService.loading;
  }
  @computed articleList(): IArticleModel[] {
    return this.articleStore.models;
  }

  private readonly articleStore: IStore<IArticleModel>;
  private articlesInitService: ArticlesInitService;
  constructor(articleStore: IStore<IArticleModel>, articlesInitService: ArticlesInitService) {
    this.articleStore = articleStore;
    this.articlesInitService = articlesInitService;
  }

  @action.bound async init(): Promise<void> {
    try {
      await this.articlesInitService.init();

      const models = this.articlesInitService.list.map<IArticleModel>(item => {
        const model = new ArticleModel(this.articleStore, item.id);

        model.context = item.context;
        model.title = item.title;
        model.url = item.url;

        return model;
      });

      runInAction(() => {
        this.articleStore.models = models;
      });
    } catch (e) {
      throw e;
    }
  }
}