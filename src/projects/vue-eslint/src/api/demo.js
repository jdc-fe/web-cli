import { demo } from './adapter';

export const getObject = () => demo.get('/mock/users/1');
export const getArray = () => demo.get('/mock/users');
