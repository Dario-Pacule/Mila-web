import { useNavigate, Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import milaLogo from "../../img/mila_logo.png"

import Styles from "./NavBar.module.css"
import { useEffect, useState } from "react";

export default function NavBar({ espUrl }) {
  const navigate = useNavigate();
  const [conectionStatus, setConectionStatus] = useState(false);

  useEffect(() => {
    fetch(`http://${espUrl}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      setConectionStatus(resp.ok)
    })
      .catch((err) => console.log(err))
  }, [espUrl])

  return (
    <nav className={Styles.nav}>
      <Link to="/">
        <img src={milaLogo} alt="Mila Logo" className={Styles.logo} />
      </Link>

      <ul className={Styles.sideUl}>
        {SidebarData.map((val, key) => {
          return (
            <li key={key}
              onClick={() => { navigate(val.link); }}
              className={window.location.pathname === val.link ? Styles.active : Styles.nav_itens}>

              <div className={Styles.icon}>{val.icon}</div>
              <div className={Styles.title}>{val.title}</div>

            </li>
          );
        })}
      </ul>
      {conectionStatus ?
        <div className={Styles.onlineMessage}>
          <p>Online</p>
        </div>
        :
        <div className={Styles.offlineMessage}>
          <p>Offline</p>
        </div>
      }
    </nav>
  );
}