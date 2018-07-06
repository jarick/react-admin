import connectLogin from './connectLogin';
import Login from './Login';
import Loader from '../Loader';

export default connectLogin(Login, Loader);
