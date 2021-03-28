const fetchClassData = (classId, dispatch) => {
  dispatch({ type: 'GOT_CLASSDATA', payload: {classId: classId} });
};

export default fetchClassData;
