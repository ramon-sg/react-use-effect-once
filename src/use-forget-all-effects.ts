import { useContext } from 'react';

import { StoreContext } from './context';

/**
 * Returns a function that allows you to forget all performed effects, allowing you
 * to perform them again in the future
 *
 * @Example
 * ```ts
 * import { useForgetAllEffects } from 'react-use-effect-once';
 *
 * export const useLogin = () => {
 *  const forgetAll = useForgetAllEffects()
 *
 *  const handleSuccess = () => {
 *    forgetAll(); // <-- forget all
 *  }
 *
 *  //....
 * }
 * ```
 */
export const useForgetAllEffects = (): Function => {
  const storeContext = useContext(StoreContext);

  return () => {
    storeContext.splice(0, storeContext.length);
  };
};
