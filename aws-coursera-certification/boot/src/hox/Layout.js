import React from 'react';

import Aux from './Aux';

const Layout = props => (
    <Aux>
        <header>
        </header>
        <main>
            {props.children}
        </main>
        <footer>
            <h1>Chears</h1>
            <span><i style={{height:'150px'}} class="far fa-heart"></i>Made with love!</span>
        </footer>
    </Aux>
);

export default Layout;