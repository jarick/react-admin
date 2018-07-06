import Loader from '../Loader';
import { connectList, connectSave, connectRemove, List } from '../Crud';
import Save from './Save';

export const ProductList = connectList(List, Loader);
export const ProductSave = connectSave(Save, Loader);
export const ProductRemove = connectRemove(Loader);