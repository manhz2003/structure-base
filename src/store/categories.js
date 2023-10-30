import { createContext } from 'react';

const initialContext = [{}, () => {}];
export const categoryStore = createContext(initialContext);
export default categoryStore.Provider;