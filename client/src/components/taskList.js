import React, { useContext } from 'react';
import Container from '@mui/material/Container';

import { useQuery } from '@apollo/client';
import { GET_ME_LISTS } from '../utils/queries';

import ListContext from './listContext';

const styles = {
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}

const TaskList = () => {
  const { activeList, setData } = useContext(ListContext);

  const handleClick = (event) => {
    console.log(event.target.dataset.listid);
    setData(event.target.dataset.listid);
  }

  const { loading, error, data } = useQuery(GET_ME_LISTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading your tasks list</p>;

  //Setting the active list to the first list from the query
  if (activeList === 'default') {
    setData(data.me.lists[0]._id);
  }
  const lists = data?.me.lists;

  console.log("testing")
  console.log(data.me.lists[0]._id)

  return (
    <Container maxWidth="full">
      {lists.map((list) => (
        <div key={list._id} style={styles.flex}>
          <div>{list.listName}</div>
          <button data-listid={list._id} onClick={handleClick}>{list.listName}</button>
          <button id={list._id} >EDIT</button>
          <button id={list._id} >🗑</button>
        </div>
      ))}
    </Container>
  );
};

export default TaskList;