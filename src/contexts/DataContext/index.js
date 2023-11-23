import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null);
  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
  }, []);
// creation de la fonction getlast pour determiné le dernier event en triant les données
  const getLast = (datas) => {
    if(datas.events){
    const lastEvent = datas.events.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setLast(lastEvent[0]);
  }};
  // Utilisation de useEffect pour charger les données lors du montage du composant 
  // et pour déterminer le dernier événement lorsque les données changent.
  useEffect(() => {
    if (data !== null) {
      getLast(data);
    }
    if (data) return;
    getData();
  });

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        // ajout de la const last non déclaré
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
