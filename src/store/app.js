import { createContext } from 'react';

const initialContext = [{}, () => {}];
export const appStore = createContext(initialContext);
export default appStore.Provider;