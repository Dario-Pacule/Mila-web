import { useState } from "react";
import Styles from "./SwitchButton.module.css";

export default function SwitchButton({ espURL }) {
  const [switchStatus, setSwitchStatus] = useState(true);

  const onChange = () => {
    setSwitchStatus(!switchStatus)
    console.log(switchStatus)

    fetch(`http://${espURL}/testmode?teststatus=${switchStatus}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((resp) => resp.json())
      .then((data) => {
        console.log("Switch response:");
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={Styles.switchContainer}>
      <label className={Styles.switch}>
        <input type="checkbox" onChange={onChange} />
        <span className={`${Styles.slider} ${Styles.round}`}></span>
      </label>
      <div><p>Modo Teste</p></div>
    </div>
  )
}