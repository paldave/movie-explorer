export const actionArrayMiddleware = ({ dispatch }) => next => action => {
  if (Array.isArray(action)) {
    action.forEach(dispatch);
    return;
  }

  next(action);
};