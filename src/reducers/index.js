export const SB_QUERY = "SB_QUERY";
export const SB_QUERY_SUCCESS = "SB_QUERY_SUCCESS";
export const SB_QUERY_FAIL = "SB_QUERY_FAIL";

export const querySB = (q, offset = 0, max = 20) => ({
  type: SB_QUERY,
  payload: {
    request: {
      params: {
        q,
        offset,
        max
      }
    }
  }
});

export default (
  state = {
    isPending: false,
    isError: false,
    items: null,
    total: 0,
    page: 1 // FIXME: 0
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
        items: action.payload.data.items,
        total: action.payload.data.total
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
