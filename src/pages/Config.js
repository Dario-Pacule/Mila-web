import { useState } from 'react';
import Container from '../components/Container';
import SwitchButton from '../components/SwitchButton';
import Styles from "./Config.module.css";


export default function Config() {
  const [showMessage, setShowMessage] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    const config = {
      "id": "serverIP",
      "ip": e.target.elements.serverIP.value
    }

    fetch("http://localhost:5000/operations/serverIP",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config)
      })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => console.log(err))
    setShowMessage(true)
    const timer = setTimeout(() => {
      setShowMessage(false)
    }, 3000)
    return () => clearTimeout(timer)

  }

  return (
    <Container>
      <div className={Styles.configContainer}>
        <h1>Configuracoes</h1>
        <form onSubmit={submitForm} className={Styles.configForm}>
          <div className={Styles.inputCard}>
            <input type="text" name="serverIP" placeholder="IP do servidor" className={Styles.input} />
          </div>
          <div className={Styles.submit}>
            <input type="submit" value="Submeter" />
          </div>
        </form>
        <SwitchButton espURL={"172.20.10.3"} />
      </div>
      {showMessage &&
        <div className={Styles.message}>
          <p>Configuração enviada!</p>
        </div>
      }
    </Container>);
}