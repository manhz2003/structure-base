import { createContext } from 'react';

const initialContext = [{}, () => {}];
export const productStore = createContext(initialContext);
export default productStore.Provider;