const initialState = {
  classId: 0,
  name: 'class total name',
  description: 'a good long class',
  students: [
    {
      id: 0, email: 'test@test.com', firstName: 'john', lastName: 'smith',
    },
    {
      id: 1, email: 'test@test.com', firstName: 'Robert', lastName: 'Albert',
    },
  ],
};

const classData = (state = initialState) => state;

export default classData;
