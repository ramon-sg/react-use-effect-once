import { createContext } from 'react';
import { Uuid } from './types';

export const StoreContext = createContext<Uuid[]>([]);
