import Link from "next/link";
import * as React from "react";
import styles from "../styles/OptionsAccordion.module.scss";

interface OptionArray {
  options: [location:string, displayName:string][];
}

function OptionsAccordion(props: OptionArray) {
  let options = props.options.map((locationNamePair) => {
    return (
      <Link href={locationNamePair[0]}>
        <a className="optionsLink">{locationNamePair[1]}</a>
      </Link>
    );
  });
  return <div className={styles.accordionContainer}>{options}</div>;
}

export default OptionsAccordion;
