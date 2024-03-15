import { useDispatch } from 'react-redux';
import { logout } from '../store/actions';

const Logout= () => {
    const dispatch = useDispatch();
    dispatch(logout());
    window.location.href = '/login';
}

export default Logout;