
export const counterReducer = (state = 1, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default: return state;
  }
}
