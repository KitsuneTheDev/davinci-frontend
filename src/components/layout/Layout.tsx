import style from './Layout.module.css';
import React from 'react';

interface LayoutProps {
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return(
        <div className={style.layoutContainer}>
            <header className={style.header}>
                <img src="/images/logo/icon-davinciBG.png" alt="site logo" />
                <h1>Davinci Board Games </h1>
            </header>
            <main className={style.main}>
                {children}
            </main>
            <footer className={style.footer}>
                <div className={style.footerName}>Kitsu</div>
                <div className={style.footerRight}>© All rights reserved</div>
            </footer>
        </div>
    );
}

export default Layout;