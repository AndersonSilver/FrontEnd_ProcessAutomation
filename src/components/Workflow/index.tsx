import style from "./styles.module.scss";
import { useEffect, FormEvent, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast, Zoom } from "react-toastify";
import { Button } from "../ui/Button";


export function Workflow() {

  const { workflow } = useContext(AuthContext);
  // const [client, setClient] = useState('');
  // const [clientServices, setClientServices] = useState('');

  const client = 'tradicao';
  const clientServices = 'consorcio';

  const handleClick = async () => {
    
    await workflow({ client, clientServices });

  }

  const webApp = localStorage.getItem('Workflow');
  console.log("webApp: ", webApp);


  return (
    <aside className={style.AsideContainer}>
      <Button onClick={handleClick}>List Workflow</Button>
    </aside>
  );
}