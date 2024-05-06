import style from "./styles.module.scss";
import { useEffect, FormEvent, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast, Zoom } from "react-toastify";
import { Button } from "../ui/Button";
type ButtonProps = {
  // outras props aqui...
  onClick?: () => void | Promise<void>; // adicione esta linha
};

export function Workflow() {
  const { workflow } = useContext(AuthContext);
  // const [client, setClient] = useState('');
  // const [clientServices, setClientServices] = useState('');

  const client = "tradicao";
  const clientServices = "consorcio";

  const handleClick = async () => {
    await workflow({ client, clientServices });
  };

  return (
    <aside className={style.AsideContainer}>
      <div onClick={handleClick}>
        <Button>List Workflow</Button>
      </div>
    </aside>
  );
}
