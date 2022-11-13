import { useContext } from 'react';

import { StoreContext } from './context';
import { Uuid } from './types';

/**
 * allows you to forget a specific effect according to its `uuid`
 *
 * @param uuid - identifier of the effect you want to forget
 *
 * @Example
 * ```ts
 * import { useForgetEffect } from 'react-use-effect-once';
 *
 * export const useSomeData = () => {
 *  const forgetFetch = useForgetEffect('fetch data')
 *
 *  const handleError = (error) => {
 *    console.error(error);
 *
 *    forgetFetch(); // <-- forget effect
 *  }
 *
 *  //....
 * }
 * ```
 */
export const useForgetEffect = (uuid: Uuid): Function => {
  const storeContext = useContext(StoreContext);

  return () => {
    const index = storeContext.indexOf(uuid);

    if (index >= 0) storeContext.splice(index, 1);
  };
};
