import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Loading from 'shared/components/Helpers/Loading';
import Spinner from 'shared/components/Spinner';
import HOST from 'shared/constants/config';
import useError from 'shared/hooks/useError';
import useQuery from 'shared/hooks/useQuery';
import { Task } from 'shared/store/reducers/taskReducer';

interface Props {
  addMany: Function;
  setError: Function;
}

const InitData: React.FC<Props> = (props) => {
  const { addMany, setError } = props;

  const { loading, error, data } = useQuery('get', `${HOST}/tasks`);

  useEffect(() => {
    if (data) {
      const newTasks: Task[] = [];
      data.forEach((task: any) => {
        newTasks.push({
          ...task,
          date: new Date(task.date),
        });
      });
      addMany(newTasks);
    }
  }, [data]);

  useError(error, setError);

  return (
    <div>
      {loading && (
        <Loading>
          <Spinner />
        </Loading>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {};
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    addMany: (payload: Task[]) => dispatch({ type: 'ADD_MANY_TASKS', payload }),
    setError: (payload: any) => dispatch({ type: 'SET_ERROR', payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitData);
