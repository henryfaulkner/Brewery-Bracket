import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../styles/OptionsAccordion.module.scss";
import globalVariables from "../styles/variables.module.scss";

interface OptionArray {
  options: [location: string, displayName: string][];
}
function OptionsAccordion(props: OptionArray) {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [navclicked, setNavClicked] = useState(false);
  const size = useWindowSize();

  let options = props.options.map((locationNamePair) => {
    return (
      <Link href={locationNamePair[0]}>
        <a className={styles.optionsLink}>{locationNamePair[1]}</a>
      </Link>
    );
  });

  let mobileStructureOnClick = (
    <div className={styles.mobileLinks}>
        <div className={styles.mobileLinksClose} onClick={() => setNavClicked(false)}>X</div>
        {options}
    </div>
  )

  let mobileStructure = (
    <div className={styles.mobileNav} onClick={() => setNavClicked(!navclicked)}>
      <div>
        <hr />
        <hr />
        <hr />
      </div>
      {navclicked ? mobileStructureOnClick : null}
    </div>
  )
  return <div className={styles.navContainer}>{size.isMobile ? mobileStructure : options}</div>;
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    isMobile: false
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      // @ts-ignore
      function handleResize() {
        // Set window width/height to state
        let mobileState = window.innerWidth <= parseInt(globalVariables.mobileBreakpoint);
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          isMobile: mobileState
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default OptionsAccordion;
