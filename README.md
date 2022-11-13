# `useEffectOnce`

`useEffectOnce` is a wrapper for `useEffect` that performs the effect only once, unlike other options it uses `useContext` and does not use `useRef`.

It also provides two hooks `useForgetEffect` and `useForgetAllEffects`.

## Installation

`npm install --save react-use-effect-once`

or

`yarn add react-use-effect-once`

## API

### `useEffectOnce`

Is a wrapper of `useEffect` that performs the effect only once throughout the entire execution of the application.

```tsx
export const useEffectOnce = (
  uuid: string,
  effect: EffectCallback,
  deps: DependencyList = [],
  skip: boolean = false
): void => {...}
```

#### Example

```ts
import { useEffectOnce } from 'react-use-effect-once';

export const useCategories = () => {
  const [fetchCategories, { data: categories, loading, error }] =
    useLazyQuery(GET_CATEGORIES);

  useEffectOnce('fetch categories', () => {
    fetchCategories();
  });

  return { categories, loading, error };
};
```

### `useForgetEffect`

Allows you to forget a specific performed effect based on its `uuid`, which allows you to perform it again in the future.

```tsx
export const useForgetEffect = (uuid: Uuid): Function => {...}
```

#### Example

```ts
import { useForgetEffect } from 'react-use-effect-once';

export const useSomeData = () => {
  const forgetFetch = useForgetEffect('fetch data');

  const handleError = (error) => {
    console.error(error);

    forgetFetch(); // <-- forget effect
  };

  //....
};
```

### `useForgetAll`

Allows you to forget all performed effects, allowing you to perform them again in the future.

```tsx
export const useForgetAllEffects = (): void => {...}
```

#### Example

```ts
import { useEffectOnce } from 'react-use-effect-once';

export const useLogin = () => {
  const forgetAll = useForgetAllEffects();

  const handleSuccess = () => {
    forgetAll(); // <-- forget all
  };

  //....
};
```

## TODO

- [ ] Add example project
- [ ] A better RADME
