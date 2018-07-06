import Loader from '../Loader';
import { connectList, connectSave, connectRemove, List } from '../Crud';
import Save from './Save';

export const OrderList = connectList(List, Loader);
export const OrderSave = connectSave(Save, Loader);
export const OrderRemove = connectRemove(Loader);