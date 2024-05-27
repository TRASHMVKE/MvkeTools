import logo from "./logo.svg";
import "./App.css";
import NavBar from "./Components/NavBar";
import { useReducer, useState } from "react";
import Card from "./Components/Card";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ModalLogin from "./Components/ModalLogin";
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import firebaseApp from './firebase'
import { FaUser } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useContext } from "react";
import { buttonContext } from "./Components/ValueContext";
import ModalInputs from "./Components/ModalInputs";
import { getFirestore, collection, getDoc, getDocs } from 'firebase/firestore';
const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)



function App() {
  const [pages, setPages] = useState([]);
  const [filter, setFilters] = useState('all');
  const [usuario, setUsuario] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openLoad, setOpenLoad] = useState(false);


  // efectos de movimiento
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);


  // obtener usuario registrado

  useEffect(()=> {
    onAuthStateChanged(auth,(usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase)
      }else{
        setUsuario(null)
      }
    })

  },[]);

  const openModal = () => {
    setIsOpen(!isOpen)
  }

  const openModalLoad = (e) => {
    e.preventDefault();
    setOpenLoad(!openLoad)
  }

  useEffect(()=> {
    const fetchPages = async() => {
      const querySnapshot = await getDocs(collection(firestore,'pages'));
      const pagesList = querySnapshot.docs.map(doc => doc.data());
      setPages(pagesList);
    }
    fetchPages();
    

  },[])

  const {setSelectedValue,selectedValue} = useContext(buttonContext)
  

  const filterProducts = (pages) => {
    return pages.filter(page => {
      return selectedValue === 'all' || page.categoria === selectedValue;
    })
  }

  const filteredPages = filterProducts(pages);

  return (
    <div className="fixed overflow-auto min-h-screen bg-fixed inset-0 -z-10 h-full w-full bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="flex justify-center items-center gap-10 text-white text-[50px]">
        <h1 data-aos="zoom-in">TrashMvke Tools</h1>
        <button className="text-white" onClick={openModal}><FaUser /></button>
        {usuario? <button onClick={openModalLoad} ><FaCloudUploadAlt /></button>: ''}
      </div>
      <NavBar />

      {openLoad && <ModalInputs openModalLoad={openModalLoad}/> }
      {isOpen && <ModalLogin openModal={openModal}/> }

      <div className="flex flex-wrap gap-5 justify-center items-center" >
        {filteredPages.length === 0 ? (
          <h1 className="text-white text-6xl">No hay nada que mostrar aun</h1>
        ): (
          filteredPages.map((page,index) => (
            <div  key={index} className="">
              <a href={page.link} target="_blank">
                <Card page={page} />
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
