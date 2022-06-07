import React from "react";
import { UserContext } from "../../lib/context";
import {useContext} from "react";
import Logout from "../../components/LogoutButton";
import Link from "next/link";
import styles from "../../styles/pages/AccountPage.module.scss";

const Account = () => {
  const {user, username} = useContext(UserContext)
  const loginLinkTsx = (
    <Link 
    href={"/login-form"}>
      <a className={styles.loginLink}>Go to login</a>
    </Link>
  );
  
  return (
    <div>
      <div>
        <h1>Account Information</h1>
        <h3>Username: {username}</h3>
        <h3>Email: {user?.email ?? "not logged in"}</h3>
        <h3>Visted Breweries</h3>
        <hr />
        {user?.email != null ? <Logout /> : loginLinkTsx}
      </div>
    </div>
  );
};

export default Account;
