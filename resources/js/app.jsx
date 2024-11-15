// import './bootstrap';
// import '../css/app.css';
import '../css/myapp.css';

// import { createRoot } from 'react-dom/client';
// import { createInertiaApp } from '@inertiajs/react';
// import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

// const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// createInertiaApp({
//     title: (title) => `${title} - ${appName}`,
//     resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
//     setup({ el, App, props }) {
//         const root = createRoot(el);

//         root.render(<App {...props} />);
//     },
//     progress: {
//         color: '#4B5563',
//     },
// });

import React from 'react';
import ReactDOM from 'react-dom/client';
import {Home} from './Pages/home';
import { Catalog } from './Pages/catalog';
import { About } from './Pages/about';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Main from './main';

ReactDOM.createRoot(document.getElementById('react-root')).render(
    // <React.StrictMode> 
        <Provider store={store}>
            <Main/>
        </Provider>
        
    // </React.StrictMode>
);
