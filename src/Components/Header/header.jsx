import { Fragment } from "react";
import classes from "./header.module.css";


const Header = () => {
  return (
    <Fragment>
      <div className={classes.box1}>
        <nav className={classes.nav}>
          <a className={classes.link} href="/">Reset</a>|
          <a className={classes.link} href="/">Geek Trust Home</a>
        </nav>
      </div>
      <div className={classes.box2}>
        <h1>Finding Falcon!</h1>
      </div>
    </Fragment>
  );
};
export default Header;
