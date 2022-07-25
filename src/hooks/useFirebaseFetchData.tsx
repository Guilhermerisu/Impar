import { useEffect, useState } from "react";

import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../services/firebase";

export default function useFirebaseFetchData(searchText: string) {
  const [dataCards, setDataCards] = useState([]);

  useEffect(() => {
    const queryData =
      searchText == ""
        ? query(collection(db, "cards"), orderBy("time", "desc"))
        : query(
            collection(db, "cards"),
            where("titulo", ">=", searchText),
            where("titulo", "<=", searchText + "\uf8ff")
          );
    onSnapshot(queryData, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });

      setDataCards(data);
    });
  }, [searchText]);

  return dataCards;
}
