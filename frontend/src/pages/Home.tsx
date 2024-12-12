import Menu from '../components/Menu';
import { authActions } from '../store/authSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import Dashboard from '../components/Dahsboard';

function Home() {

const userData = useSelector((state: RootState) => state.authenticator);

const [open, setOpen] = useState(false);
const dispatch = useDispatch();
const navigate = useNavigate();
  
const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/');
  };


  return (
    <><Menu />
    <Dashboard/>
    </>
  );
}

export default Home;