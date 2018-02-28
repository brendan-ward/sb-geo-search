

export const SB_QUERY = "SB_QUERY";
export const SB_QUERY_SUCCESS = 'SB_QUERY_SUCCESS';
export const SB_QUERY_FAIL = 'SB_QUERY_FAIL';

export const querySB = query => ({
  type: SB_QUERY,
  payload: {
    request: {
      params: {
        q: query
      }
    }
  }
});

export default (
  state = {
    isPending: false,
    isError: false,
    items: null
  },
  action
) => {
  switch (action.type) {
    case SB_QUERY:
      console.log("start request");
      return Object.assign({}, state, {
        isError: false,
        isPending: true,
        items: null
      });

    case SB_QUERY_SUCCESS:
      console.log(" request succeeded", action);
      return Object.assign({}, state, {
        isError: false,
        isPending: false,
        items: action.payload.data.items
      });

    case SB_QUERY_FAIL:
      console.log(" request failed");
      return Object.assign({}, state, {
        isError: true,
        isPending: false,
        items: null
      });

    default:
      return state;
  }
};
