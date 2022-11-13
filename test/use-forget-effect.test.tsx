/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react';
import { useEffectOnce, useForgetEffect } from '../src';

describe('useForgetEffect', () => {
  test('should trigger multiple time if forget effect', () => {
    const uuid1 = 'effect-1';
    const uuid2 = 'effect-2';

    const effect1 = jest.fn();
    const effect2 = jest.fn();

    const { result: forgetFn } = renderHook(() => useForgetEffect(uuid1));

    renderHook(() => useEffectOnce(uuid1, effect1));
    renderHook(() => useEffectOnce(uuid2, effect2));

    expect(effect1).toHaveBeenCalledTimes(1);
    expect(effect2).toHaveBeenCalledTimes(1);

    /** Forget effect */
    act(() => {
      forgetFn.current();
    });

    renderHook(() => useEffectOnce(uuid1, effect1));
    renderHook(() => useEffectOnce(uuid2, effect2));

    expect(effect1).toHaveBeenCalledTimes(2);
    expect(effect2).toHaveBeenCalledTimes(1);
  });
});
