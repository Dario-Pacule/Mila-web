import Styles from "./Relatory.module.css";
import { MdAccessTimeFilled, MdOutlineAddLink } from "react-icons/md";


export default function Relatory({ type, data, time, duration }) {
  return (
    <div className={Styles.relContainer}>
      <div className={Styles.icon}>
        {type === "1" ? <MdAccessTimeFilled /> : <MdOutlineAddLink />}
      </div>
      <div className={Styles.content}>
        <h3>{type === "1" ? "Irrigação padrão" : "Irrigação Programada"}</h3>
        <div className={Styles.operation_data}>
          <p>Data: {data}</p>
          <p>Hora: {time}</p>
          <p>Duração: {duration} min</p>
        </div>
      </div>
    </div>
  )
}