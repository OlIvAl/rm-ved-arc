import { IModel } from '../models/interfaces';

/**
 * Хранилище массива данных
 * @param T интерфейс хранимых моделей
 */
export interface IStore<T extends IModel> {
  /**
   * Список хранимых моделей
   */
  models: T[];

  /**
   * Метод очищает список хранимых моделей
   */
  resetStore: () => void;
}
/**
 * Объект хранилища массива данных с активной моделью
 *  @param T интерфейс хранимых моделей
 */
export interface IStoreWithCurrentModel<T extends IModel> extends IStore<T> {
  /**
   * Объект активной модели
   */
  currentModel: T | null;

  /**
   *
   * @param model
   */
  setCurrentModel: (model: ID) => void;
  /**
   * Метод убирает активную модель
   */
  resetCurrentModel: () => void;
  /**
   * Метод очищает список хранимых моделей и убирает активную модель
   */
  resetStore: () => void;
}