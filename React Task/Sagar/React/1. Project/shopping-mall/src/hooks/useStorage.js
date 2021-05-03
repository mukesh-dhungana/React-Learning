import { useState, useEffect } from "react";
import { storage } from "../firebase/config";

const useStorage = (file, setShopUrl) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    //storage

    if (file) {
      file.forEach((f) => {
        const storageRef = storage.ref(f.name);

        storageRef.put(f).on(
          "state_changed",
          (snap) => {
            console.log("Uploaded");
          },
          (err) => console.log(err.code),
          async () => {
            const url = await storageRef.getDownloadURL();
            // setCreatedAt(timestamp);
            setShopUrl((prevState) => [...prevState, url]);
          }
        );
      });
    }
  }, [file]);

  return { url };
};

export default useStorage;
