import { demo } from './adapter';

export const getObject = () => demo.get('/mock/object');
export const getArray = () => demo.get('/mock/array');
