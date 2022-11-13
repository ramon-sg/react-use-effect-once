/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react';
import { useEffectOnce, useForgetAllEffects } from '../src';

describe('useForgetAllEffects', () => {
  test('should trigger multiple time if forget all effect', () => {
    const effect1 = jest.fn();
    const effect2 = jest.fn();

    const uuid1 = 'effect-uuid-1';
    const uuid2 = 'effect-uuid-2';

    const { result: forgetAllFn } = renderHook(() => useForgetAllEffects());

    renderHook(() => useEffectOnce(uuid1, effect1));
    renderHook(() => useEffectOnce(uuid2, effect2));

    expect(effect1).toHaveBeenCalledTimes(1);
    expect(effect2).toHaveBeenCalledTimes(1);

    /** Forget effect */
    act(() => {
      forgetAllFn.current();
    });

    renderHook(() => useEffectOnce(uuid1, effect1));
    renderHook(() => useEffectOnce(uuid2, effect2));

    expect(effect1).toHaveBeenCalledTimes(2);
    expect(effect2).toHaveBeenCalledTimes(2);
  });
});
