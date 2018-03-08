export const SET_EXTENT = "SET_EXTENT";
export const SB_QUERY = "SB_QUERY";
export const SB_QUERY_SUCCESS = "SB_QUERY_SUCCESS";
export const SB_QUERY_FAIL = "SB_QUERY_FAIL";

export const querySB = (q, extent = null, page = 1, itemsPerPage = 20) => ({
  type: SB_QUERY,
  page,
  payload: {
    request: {
      params: {
        q,
        filter: (extent)? ('spatialQuery={"type":"envelope","coordinates":' + JSON.stringify(extent)) + '}': null,
        offset: (page - 1) * itemsPerPage
      }
    }
  }
});

export const setExtent = (extent) => ({
  type: SET_EXTENT,
  extent: extent
});

export default(state = {
  isPending: false,
  isError: false,
  items: null,
  total: 0,
  page: 1,
  extent: null
}, action) => {
  switch (action.type) {
    case SET_EXTENT:
      console.log('set extent', action.extent)
      return Object.assign({}, state, {extent: action.extent});

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
