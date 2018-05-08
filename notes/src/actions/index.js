import axios from 'axios';

export const ERROR = 'ERROR';
export const GET_NOTES = 'GET_NOTES';
export const GETTING_NOTES = 'GETTING_NOTES';
export const CREATING_NOTE = 'CREATING_NOTE';
export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTES';
export const DELETE_NOTE = 'DELETE_NOTE';
export const UPDATING_NOTE = 'UPDATING_NOTE';
export const DELETING_NOTE = 'DELETING_NOTE';
export const SINGLE_NOTE = 'SINGLE_NOTE';
export const TOGGLE_UPDATE_NOTE = 'TOGGLE_UPDATE_NOTE';

const URL = 'http://localhost:5500/api/notes';

export const getNotes = () => {
  const notes = axios.get(`${URL}/get`);
  return dispatch => {
    dispatch({ type: GETTING_NOTES });
    notes
      .then(response => {
        dispatch({ type: GET_NOTES, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const createNote = note => {
  const newNote = axios.post(`${URL}/create`, note);
  return dispatch => {
    dispatch({ type: CREATING_NOTE });
    newNote
      .then(({ data }) => {
        dispatch({ type: CREATE_NOTE, payload: data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const deleteNote = id => {
  const deletedNote = axios.delete(`${URL}/delete`, {
    data: { id }
  });
  return dispatch => {
    dispatch({ type: DELETING_NOTE });
    deletedNote
      .then(({ data }) => {
        dispatch({ type: DELETE_NOTE, payload: data });
        dispatch({ type: SINGLE_NOTE, payload: {} });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const toggleShowUpdate = () => {
  return {
    type: TOGGLE_UPDATE_NOTE
  };
};

export const updateSingleNote = note => {
  return {
    type: SINGLE_NOTE,
    payload: note
  };
};
