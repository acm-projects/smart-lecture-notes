import React from 'react';
import Navigator from './Navigator';
import { connect, Provider } from 'react-redux';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
//import fetchAll from './actions';

const store = createStore(reducers, applyMiddleware(thunk));

class App extends React.Component {
    // componentDidMount() {
    //     this.props.fetchAll();
    // }

    render() {
        return (
            <Provider store={store}>
                <Navigator />
            </Provider>
        );
    }
}

// const mapStateToProps = (state) => ({
//     all: state.all
// });

// // The connect function will store.dispatch(action) behind the screen for us
// export default connect(
//     mapStateToProps, //suppose to be mapStateToPosts
//     { fetchAll }
// )(App);

export default App;
