import React from 'react';
import styles from '../styles/Header.module.scss';

const Header = (props) => {




        return (
        <div className={styles.navBar}>
            <h1>Brewery Bracket</h1>
            <div className={styles.headerOptions}>
                <p class={styles.headerLink} onClick={props.breweries}>Breweries</p>
                <p class={styles.headerLink} onClick={props.account}>Account</p>
            </div>
        </div>
        );
}

export default Header;