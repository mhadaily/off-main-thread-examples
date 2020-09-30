const initialState = { count: 0 };

const delayFunction = () => {
  console.log('Start to delay...');
  const seconds = 3;
  const start = new Date().getTime();
  const delay = seconds * 1000;
  while (true) {
    if (new Date().getTime() - start > delay) {
      break;
    }
  }
  console.log('Finished delaying');
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'increment':
      delayFunction();
      return { ...state, count: state.count + 1 };
    case 'decrement':
      delayFunction();
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};
