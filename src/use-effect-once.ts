import { DependencyList, EffectCallback, useContext, useEffect } from 'react';

import { StoreContext } from './context';
import { Uuid } from './types';

/**
 * Allows you to forget a specific performed effect based on its `uuid`,
 * which allows you to perform it again in the future.
 *
 * Accepts a function that contains imperative, possibly effectful code.
 * @param uuid — Unique identifier of the effect
 * @param effect — Imperative function that can return a cleanup function
 * @param deps [deps=[]] — If present, effect will only activate if the values in the list change.
 * @param skip [skip=false] - if it is past, the effect will not be performed
 *
 * @example
 * ```ts
 * import { useEffectOnce } from 'react-use-effect-once';
 *
 * export const useCategories = () => {
 *  const [fetchCategories, { data: categories, loading, error }] = useLazyQuery(GET_CATEGORIES)
 *
 *  useEffectOnce('fetch categories', () => {
 *    fetchCategories();
 *  }, [])
 *
 *  return { categories, loading, error };
 * }
 * ```
 */

export const useEffectOnce = (
  uuid: Uuid,
  effect: EffectCallback,
  deps: DependencyList = [],
  skip: boolean = false
): void => {
  const storeContext = useContext(StoreContext);

  useEffect(() => {
    if (skip || !effect || storeContext.includes(uuid)) return;

    storeContext.push(uuid);

    return effect();
  }, deps);
};
