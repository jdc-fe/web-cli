import { demo } from './adapter';

export const getObject = () => demo.get('/mock/user/1');
export const getArray = () => demo.get('/mock/users');

