import { useState, useEffect, useRef } from "react";
import Container from "../components/Container";
import DonutChart from "../components/donutchart/DonutChart";
import Relatory from "../components/Relatory";
import espData from "../data/ESPData";
import Styles from "./Home.module.css"

export default function Home() {
  const [irrigRel, setIrrigRel] = useState([]);
  const [level, setLevel] = useState(0)
  const [operations, setOperations] = useState([])
  const [espRtcTime, setEspRtcTime] = useState("00:00")
  const auxLevel = useRef(0);
  espData("172.20.10.3")

  useEffect(() => {
    fetch("http://localhost:5000/relatory", {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    }).then((resp) => resp.json())
      .then((data) => {
        //console.log(data);
        setIrrigRel(data)
      })
      .catch((err) => console.log(err))

    fetch("http://localhost:5000/operations/1", {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    }).then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        setOperations(data)
      })
      .catch((err) => console.log(err))

    fetch("http://172.20.10.3/rtctime", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(resp => resp.json())
      .then((data) => {
        console.log("RTC: ")
        console.log(data.rtctime)
        setEspRtcTime(data.rtctime)
      })
      .catch(err => console.log(err))

  }, []);

  setInterval(() => {
    setLevel(reloadLevel("172.20.10.3", auxLevel))
  }, 5000)

  return (
    <Container>
      <div className={Styles.top}>
        <div className={Styles.card_home}>
          <DonutChart level={level} />
          <h3>Humidade do solo</h3>
        </div>
        <div className={Styles.card_home}>
          <p>{espRtcTime}</p>
          <h4 >Hora do Subsistema</h4>
        </div>
        <div className={Styles.card_home}>
          <p>{operations.time}</p>
          <h4 >Proxima irrigação</h4>
        </div>
      </div>
      <div className={Styles.title_rel}>
        <h2>Relatório</h2>
      </div>
      <div className={Styles.down}>
        {irrigRel.length > 0 ? irrigRel.map((relData) => { return (<Relatory key={relData.id} type={relData.type} data={relData.Data} time={relData.time} duration={relData.duration} />) }) : <p>Nenhum relatório foi encontrado!</p>}
      </div>
    </Container>);
}

function reloadLevel(espUrl, auxLevel) {
  fetch(`http://${espUrl}/getsensorlevel`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(resp => resp.json())
    .then((data) => {
      auxLevel.current = data.level;
    })
    .catch(err => console.log(err))

  return auxLevel.current;
}