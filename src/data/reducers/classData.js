const initialState = {
  classId: 0,
  name: 'class total name',
  description: 'a good long class',
  media: 'rocket.png',
  students: [
    {
      id: 0, email: 'test@test.com', firstName: 'john', lastName: 'smith', 
    },
    {
      id: 1, email: 'test@test.com', firstName: 'Robert', lastName: 'Albert', 
    },
  ],
};

const classData = (state = initialState, action) => {
  switch (action.type) {
    case 'GOT_CLASSDATA':
      return {...state,
        classId: action.payload.classId,
        media: action.payload.classId == '34' ? 'rocket.png' : 'interactive-playground.png',
        name: action.payload.classId == '34' ? 'class 34' : 'class 65',
      }
    default: 
      return state;
  }
};

export default classData;
