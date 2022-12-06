import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Layout from './components/layout/layout';
import Templates from './components/templates';
import registerServiceWorker from './registerServiceWorker';


export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route index element={<Templates />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
