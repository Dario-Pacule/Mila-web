import { useEffect, useState } from "react"
import Styles from "../Form/LogicForm.module.css"


export default function LogicForm({ id, messageState, espURL }) {
  const [configData, setConfigData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/operations/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(`GET operation id: ${id}`)
        console.log(data)
        setConfigData(data)
      })
      .catch((err) => console.log(err))
  }, [id]);


  const submitForm = (e) => {
    e.preventDefault();
    const config = {
      "id": id,
      "time": e.target.elements.time.value,
      "operation": e.target.elements.operation.value,
      "duration": e.target.elements.duration.value
    }

    fetch(`http://${espURL}/setconfig?id=${id}&time=${e.target.elements.time.value}&operation=${e.target.elements.operation.value}&duration=${e.target.elements.duration.value}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(`ESP setConfig response id: ${id}`)
        console.log(data)
      })
      .catch((err) => console.log(err))

    console.log(config)

    fetch(`http://localhost:5000/operations/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config)
      })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(`Operations id: ${id} `)
        console.log(data)
      })
      .catch((err) => console.log(err))

    messageState(true)
    const timer = setTimeout(() => {
      messageState(false)
    }, 3000)
    return () => clearTimeout(timer)

  }

  return (
    <>
      <form onSubmit={submitForm} className={Styles.form}>
        <div className={Styles.inputCard}>
          <input type="time" name="time" placeholder={configData ? configData.time : 'Hora'} className={Styles.input} />
          <select name="operation" className={Styles.select}>
            <option value="Irrigacao"> Irrigação</option>
            <option value="Pulverizacao"> Pulverização</option>
          </select>
          <input type="number" name="duration" id={id} className={Styles.input} placeholder="Duração" />
        </div>
        <div className={Styles.submit}>
          <input type="submit" value="Submeter" />
        </div>
      </form>
    </>
  )
}