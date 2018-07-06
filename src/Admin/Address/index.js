import List from '../Crud/List';
import Loader from '../Loader';
import { connectList, connectSave, connectRemove } from '../Crud';
import Save from './Save';

export const AddressList = connectList(List, Loader);
export const AddressSave = connectSave(Save, Loader);
export const AddressRemove = connectRemove(Loader);
