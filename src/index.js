import React from 'react';
import ReactDOM from 'react-dom';
import { RMWCProvider } from '@rmwc/provider';
import { Provider } from 'react-redux';
import store from './redux/store/configureStore';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import App from './containers/App';

import Requests from './pages/Requests';
import Request from './pages/Request';
import RequestForm from './pages/RequestForm';

import '@rmwc/icon/icon.css';
import '@rmwc/circular-progress/circular-progress.css';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import '@material/typography/dist/mdc.typography.css';
import '@material/button/dist/mdc.button.css';
import '@material/dialog/dist/mdc.dialog.css';
import '@material/menu/dist/mdc.menu.css';
import '@material/menu-surface/dist/mdc.menu-surface.css';
import '@material/list/dist/mdc.list.css';
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import '@material/linear-progress/dist/mdc.linear-progress.css';
import '@material/snackbar/dist/mdc.snackbar.css';
import '@material/button/dist/mdc.button.css';

import './styles/app.css';

ReactDOM.render(
    <RMWCProvider>
        <Provider store={store}>
            <Router>
                <App>
                    <Switch>
                        <Route exact path="/requests" component={Requests} />
                        <Route
                            exact
                            path="/requests/add"
                            component={RequestForm}
                        />
                        <Route
                            exact
                            path="/requests/:hash"
                            component={Request}
                        />

                        <Redirect to="/requests" />
                    </Switch>
                </App>
            </Router>
        </Provider>
    </RMWCProvider>,
    document.getElementById('root')
);
