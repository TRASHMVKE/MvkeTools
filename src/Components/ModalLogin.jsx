import React, { useEffect, useState } from "react";
import firebaseApp from "../firebase";
import { IoMdClose } from "react-icons/io";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
const auth = getAuth(firebaseApp);

export default function ModalLogin({openModal}) {
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("usuario registered");
    } catch (error) {
      console.log(error.message);
    }
    console.log(email);
    console.log(password);
    setpassword("");
    setEmail("");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase.email);
      } else {
        setUsuario(null);
      }
    });
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 fixed top-0 left-0 w-full h-full backdrop-blur-sm z-50"
    >
      <div className="flex justify-center items-center h-screen text-white  ">
        <div className="bg-white/10 w-[300px] h-[250px] rounded-lg ">
        <button onClick={openModal}><IoMdClose className="text-[50px] absolute  top-40" /></button>
          {usuario === null ? (
            <div className="flex flex-col items-center gap-5">
              <h1 className="text-2xl">Login</h1>
              <input
                type="mail"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="p-2 rounded-md text-black"
              />
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                required
                className="p-2 rounded-md text-black"
              />
              <div>
                <button className="border p-3 rounded-md ">
                  Iniciar sesion
                </button>
              </div>
            </div>
          ) : (
            <div className=" w-full h-full flex items-center flex-col">
                <h1>{usuario}</h1>
                <button
                 className="button2 text-2xl mt-12"
                 onClick={() => signOut(auth)}
                 
                 >LogOut</button>
            </div>
            
            
          )}
        </div>
      </div>
    </form>
  );
}
