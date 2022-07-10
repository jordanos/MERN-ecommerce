import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NtwState } from 'shared/store/reducers/appReducer';
import { UserState } from 'shared/store/reducers/userReducer';
import InitData from './InitData';

interface Props {
  ntw: NtwState;
  user: UserState;
}

const Init: React.FC<Props> = (props) => {
  const { ntw, user } = props;
  useEffect(() => {
    if (ntw.error.error) {
      toast(`${ntw.error.error}`);
    }
  }, [ntw.error]);

  return (
    <>
      <ToastContainer position="bottom-left" />
      {user.token !== null && <InitData />}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return { ntw: state.app.ntwState, user: state.user };
};

export default connect(mapStateToProps)(Init);
