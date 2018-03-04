export const SB_QUERY = "SB_QUERY";
export const SB_QUERY_SUCCESS = "SB_QUERY_SUCCESS";
export const SB_QUERY_FAIL = "SB_QUERY_FAIL";

export const querySB = (q, page = 1, itemsPerPage = 20) => ({
  type: SB_QUERY,
  page,
  payload: {
    request: {
      params: {
        q,
        offset: (page - 1) * itemsPerPage
      }
    }
  }
});

export default(state = {
  isPending: false,
  isError: false,
  items: null,
  total: 0,
  page: 1
}, action) => {
  switch (action.type) {
    case SB_QUERY:
      console.log("start request", action);
      return Object.assign({}, state, {
        isError: false,
        isPending: true,
        items: null,
        page: action.page
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
