const fetchClassData = (classId, dispatch) => {
  dispatch({ type: 'GOT_CLASSDATA', payload: { classId } });
};

export default fetchClassData;
