import { useEffect, useRef } from "react";

export default function ESPData(espURL) {
  const espDatas = useRef();
  const dbDatas = useRef();
  const patchState = useRef(true);

  useEffect(() => {
    fetch(`http://${espURL}/log`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((resp) => resp.json())
      .then((data) => {
        console.log("FETCH Log data:");
        console.log(data);
        espDatas.current = data;
        updateDB();
      })
      .catch((err) => console.log(err));
  }, [espURL])

  useEffect(() => {
    fetch(`http://localhost:5000/relatory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((resp) => resp.json())
      .then((data) => {
        console.log("DB Log data:");
        console.log(data);
        dbDatas.current = data;
      })
      .catch((err) => console.log(err));
  }, [])

  function updateDB() {
    espDatas.current.map((espLog) => {
      patchState.current = true;

      dbDatas.current.map((dbLog) => {
        if (espLog.id === dbLog.id) {
          console.log("Dentro da requisicao PATCH")
          console.log(espLog)

          patchState.current = false;

          fetch(`http://localhost:5000/relatory/${espLog.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(espLog)
          }).then((resp) => resp.json())
            .catch((err) => console.log(err));
        }
        return dbLog
      })

      if (patchState.current) {
        console.log("Dentro da requisicao POST")
        console.log(espLog)

        fetch("http://localhost:5000/relatory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(espLog)
        }).then((resp) => resp.json())
          .catch((err) => console.log(err));
      }
      return espLog
    })
  }
}