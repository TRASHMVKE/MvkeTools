import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import firebase from "../firebase";

export default function ModalInputs({ openModalLoad }) {
  const storage = getStorage(firebase);
  const firestore = getFirestore(firebase);
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const valorInicial = {
    nombre: "",
    link: "",
    categoria: "",
  };
  const [pagina, setPagina] = useState(valorInicial);

  const handleValue = (e) => {
    const { name, value } = e.target;
    setPagina({
      ...pagina,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((dowloadURL) => {
            savePageInfo(dowloadURL);
          });
        }
      );
    }
  };

  

  const savePageInfo = async (imageUrl) => {
    try {
      const docRef = await addDoc(collection(firestore, "pages"), {
        nombre: pagina.nombre,
        link: pagina.link,
        categoria: pagina.categoria,
        imageUrl,
        Timestamp: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      setPagina(valorInicial);
      setImage(null);
      setProgress(0);
    } catch (e) {
      console.error("Error saving:", e);
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="text-white bg-white/5 fixed top-0 left-0 w-full h-full backdrop-blur-sm z-50"
    >
      <div className="flex justify-center items-center h-screen text-white">
        <button
          onClick={(e) => openModalLoad(e)}
          className="text-white absolute top-[150px] text-2xl"
        >
          <IoMdClose />
        </button>

        <div className="flex flex-col gap-3 bg-white/10 w-[300px] h-auto rounded-lg p-10 ">
          <input
            type="text"
            placeholder="nombre"
            name="nombre"
            className="p-2 rounded-lg text-black"
            onChange={handleValue}
            value={pagina.nombre}
            required
          />

          <input
            type="text"
            placeholder="link"
            name="link"
            className="p-2 rounded-lg text-black"
            onChange={handleValue}
            value={pagina.link}
            required
          />

          <input
            type="text"
            placeholder="categoria"
            name="categoria"
            className="p-2 rounded-lg text-black"
            onChange={handleValue}
            value={pagina.categoria}
            required
          />
          <input type="file" onChange={handleImageChange} />
          <button>subir</button>
        </div>
      </div>
    </form>
  );
}
