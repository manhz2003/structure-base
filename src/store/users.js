import { createContext } from 'react';

const initialContext = [{}, () => {}];
export const userStore = createContext(initialContext);
export default userStore.Provider;