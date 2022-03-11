import { useState } from 'react';
import Container from '../components/Container';
import LogicForm from '../components/Form/LogicForm';
import Styles from "./Logic.module.css"

export default function Logic({ espURL }) {
  const [showMessage, setShowMessage] = useState(false);

  const submitForm = (e) => {
    const config = {
      "id": "sensor",
      "sensorlevel": e.target.elements.sensorValue.value
    }

    e.preventDefault();
    console.log("Valor do sensor:")
    console.log(e.target.elements.sensorValue.value)

    fetch(`http://${espURL}/sensorlevel?level=${e.target.elements.sensorValue.value}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("ESP setSensorLevel:")
        console.log(data)
      })
      .catch((err) => console.log(err))


    fetch("http://localhost:5000/operations/sensor",
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
      <div className={Styles.logicContainer}>
        <h1>Logica</h1>
        <div>
          <LogicForm id={"1"} messageState={setShowMessage} espURL={"172.20.10.3"} />
          <LogicForm id={"2"} messageState={setShowMessage} espURL={"172.20.10.3"} />
          <LogicForm id={"3"} messageState={setShowMessage} espURL={"172.20.10.3"} />
        </div>
        <h2>Sensor de humidade</h2>
        <div>
          <form onSubmit={submitForm} className={Styles.sensorForm}>
            <div className={Styles.inputCard}>
              <input type="number" name="sensorValue" className={Styles.input} placeholder="Nivel do Sensor" />
            </div>
            <div className={Styles.submit}>
              <input type="submit" value="Submeter" />
            </div>
          </form>
        </div>
      </div>
      {showMessage &&
        <div className={Styles.message}>
          <p>Configuração enviada!</p>
        </div>
      }
    </Container>);
}