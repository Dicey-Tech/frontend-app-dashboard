const initialState = {
  classes: [
    {
      classId: 34, title: 'class 34', studentCount: 25, level: '8th Grade', media: 'rocket.png',
    },
    {
      classId: 65, title: 'class 65', studentCount: 21, level: 'GCSE', media: 'interactive-playground.png',
    },
  ],
};

const teaching = (state = initialState) => state;

export default teaching;
