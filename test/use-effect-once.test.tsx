/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import { useEffectOnce } from '../src';

describe('useEffectOnce', () => {
  test('should be triggered only once', () => {
    const effect = jest.fn();
    const uuid = 'effect';

    renderHook(() => useEffectOnce(uuid, effect));

    expect(effect).toHaveBeenCalledTimes(1);

    renderHook(() => useEffectOnce(uuid, effect));

    expect(effect).toHaveBeenCalledTimes(1);
  });

  describe('with skip `true`', () => {
    test('should not be triggered', () => {
      const effect = jest.fn();
      const uuid = 'effect-with-skip';
      const skip = true;

      renderHook(() => useEffectOnce(uuid, effect, [], skip));

      expect(effect).toHaveBeenCalledTimes(0);

      renderHook(() => useEffectOnce(uuid, effect, [], skip));

      expect(effect).toHaveBeenCalledTimes(0);
    });
  });
});
