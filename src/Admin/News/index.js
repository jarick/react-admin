import Loader from '../Loader';
import { connectList, connectSave, connectRemove, List } from '../Crud';
import Save from './Save';

export const NewsList = connectList(List, Loader);
export const NewsSave = connectSave(Save, Loader);
export const NewsRemove = connectRemove(Loader);
