import { IArticleModel } from './interfaces';
import AbstractModel from './AbstractModel';
import { IStore } from '../stores/interfaces';

export class ArticleModel
  extends AbstractModel<IStore<IArticleModel>>
  implements IArticleModel {
  title = '';
  url = '';
  context = '';
}
