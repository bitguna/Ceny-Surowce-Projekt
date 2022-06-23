import {
  useState,
  useEffect,
} from "react";
import axios from "axios"; // libka do requestów http
import {
  Chart
} from "./Chart";
import "./App.css";

const compareDate = (date1, date2) => { // date is string "yyyy-mm" if date1 is bigger then returns 1 else -1
  const date1Obj = {
    year: Number(date1.slice(0, 4)),
    month: Number(date1.slice(4))
  }
  const date2Obj = {
    year: Number(date2.slice(0, 4)),
    month: Number(date2.slice(4))
  }
  if (date1Obj.year > date2Obj.year) {
    return 1
  } else if (date1Obj.year === date2Obj.year) {
    if (date1Obj.month > date2Obj.month) {
      return 1
    } else {
      return -1
    }
  }
  return -1
}
// poniżej i powyżej funkcje funkcje sortujące
const sortRecords = (records) => {
  return records.sort((a, b) => {
    return compareDate(a.date, b.date);
  })
}
// polecam poczytać o hookach i obejrzeć jakieś podstawowe tutoriale jak działa react, pomoże wam to w zrozumieniu co sie tu dzieje
function App() {
  const [commoditiesNames, setCommoditiesNames] = useState([]); // tutaj przetrzymujemy info o surowcach
  const [currentCommodityIndex, setCurrentCommodityIndex] = useState(null);
  const [currentChartData, setCurrentChartData] = useState({
    name: "",
    id: null,
    records: []
  })

  useEffect(() => { // ta funkcja pobiera listę nazw surowców podczas załadowania strony i zapisuje je w stanie jako commoditiesNames
    axios.get("/keys").then((res) => setCommoditiesNames(res.data)).catch(e => console.log(e));
  }, []);


  // pobieramy dane aktualnie wybranego surowca i zapisujemy jest w stanie poprzez wywolanie funkcji setCurrentChartData
  useEffect(() => {
    axios.get(`/data/${currentCommodityIndex}`).then(res => setCurrentChartData({
      ...res.data,
      records: sortRecords(res.data.records)
    })).catch(e => console.log(e));
  }, [currentCommodityIndex]); // podanie tutaj currentCommodityIndex sprawia że gdy się zmieni jego wartość to dane są pobierane ponownie


  return <div className="App" >
    <div className = "namesList" > 
      {commoditiesNames.map((name, i) => // WYŚWIETLAMY Wszystkie nazwy surowców zapisanych w "commoditiesNames"
        <div className = "listName"
          onClick = {() => setCurrentCommodityIndex(i)} // funkcja która na kliknięcie zmienia aktualnie wybrany surowiec
          style = {{backgroundColor: i === currentCommodityIndex ? "lightblue" : ""}}
          key = {name}>
          {name}
        </div>
        )
      } 

      </div> 
        <div className = "chartDiv" >
            <h2> {currentChartData.name} </h2> 
            <Chart data={currentChartData}/> {/* komponent Chart jest importowany z pliku Chart.js */ }
          </div> 
        </div>;
      }

      export default App;