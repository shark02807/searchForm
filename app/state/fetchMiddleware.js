export default ({ dispatch, getState }) => {
  const aggregateData = {};

  const addToAggregateData = (key, data) => {
    if (!aggregateData[key]) aggregateData[key] = [];
    aggregateData[key] = aggregateData[key].concat(data);
  };

  return next => action => {
    const {
      aggregate,
      payload,
      type,
      types,
      api,
      shouldCall = () => true
  } = action;
    if (type || !types || !api) return next(action);
    const pendingType = types.shift();

    if (!shouldCall(getState())) {
      return null;
    }

    const actionParams = {
      type: pendingType,
      meta: {
        isStandard: true,
        types,
        api
      }
    };

    if (aggregate) {
      const isAggregateExists = !!aggregateData[pendingType];
      addToAggregateData(pendingType, payload);
      if (isAggregateExists) return;
      setTimeout(() => {
        dispatch({
        ...actionParams,
        payload: aggregateData[pendingType]
    });
      delete aggregateData[pendingType];
    }, 0);
    } else {
      dispatch({
          ...actionParams,
        payload
    });
    }

    return null;
  };
};
