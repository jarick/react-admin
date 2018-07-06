import Loader from '../Loader';
import { connectList, connectSave, connectRemove, List } from '../Crud';
import Save from './Save';

export const UserList = connectList(List, Loader);
export const UserSave = connectSave(Save, Loader);
export const UserRemove = connectRemove(Loader);