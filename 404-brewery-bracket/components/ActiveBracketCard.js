import React from 'react';
import styles from '../styles/ActiveBracketCard.module.scss';

const ActiveBracketCard = (props) => {

    return (
        props.override ? 
        <div className={styles.abCardCont}>
            <div className={styles.abCardBody}>
                <span className={styles.addBracketCard}>+</span>
            </div>
        </div>
        :
        <div className={styles.abCardCont}>
            <div className={styles.abCardBody}>
                <h1>{props.name}</h1>
            </div>
        </div>
    )
}

export default ActiveBracketCard;