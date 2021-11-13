import { createStore } from 'redux';
import { AppCard } from './app-card.component';
import { Provider } from 'react-redux';
import React from "react";

const countReducer = function (state = 0, action) {
    switch (action.type) {
      case "INCREMENT":
        return (state || 0) + 1;
      case "DECREMENT":
        return (state || 0) - 1;
      default:
        return (state || 0);
    }
  };

const store = createStore(countReducer);

const CardContainer = (props) => {
    return <Provider store={store}>
        <AppCard {...props} />
    </Provider>
}

export default CardContainer