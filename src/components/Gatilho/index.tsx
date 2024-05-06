import style from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Select from "react-select";
import AceEditor from "react-ace";
import { toast, Zoom } from "react-toastify";


import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";


export function Gatilho() {
  const { getAllFluxo } = useContext(AuthContext);
  const { getFluxo } = useContext(AuthContext);
  const { trigger } = useContext(AuthContext);
  const { getHabs } = useContext(AuthContext);
  const { getTabs } = useContext(AuthContext);
  const { saveTrigger } = useContext(AuthContext);
  const { verifyHabilidades } = useContext(AuthContext);
  const { verifyTabulacoes } = useContext(AuthContext);


  const [fluxos, setFluxos] = useState([]);
  const [selectedFluxo, setSelectedFluxo] = useState(null); // Novo estado para o fluxo selecionado
  const [hab, setHab] = useState(""); // Renomeado de value para hab
  const [tab, setTab] = useState(""); // Renomeado de value2 para tab

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
    }),
  };

  const handleChange = (newValue) => {
    setHab(newValue);
  };

  const handleChange2 = (newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    async function fetchFluxos() {
      const result = await getAllFluxo();
      setFluxos(result);
    }

    fetchFluxos();
  }, []);

  const options = fluxos.map((fluxo) => ({
    value: fluxo.id,
    label: fluxo.name,
  }));

  const handleSelectChange = async (selectedOption) => {
    setSelectedFluxo(selectedOption);
    if (selectedOption){
      const fluxo = await getFluxo(selectedOption.value);
    }
    
};

const handleSave = async (formattedHabs, formattedTabs) => {
  let validate = true;

  if (selectedFluxo) {
    validate = !(formattedHabs === "[]" || formattedTabs === "[]");
    await trigger(validate);
  }

  validate = !(formattedHabs === "[]" || formattedTabs === "[]");

  await getHabs(formattedHabs, validate);
  await getTabs(formattedTabs, validate);
};


const publish = async () => {
    const result = await saveTrigger();
}

const formatJson = async () => {

  function isUUID(uuid) {
    let s = "" + uuid;
    s = s.toLowerCase();
    var regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    return regex.test(s);
  }

  let habsArray = hab.split(/\r?\n/);
  let tabsArray = tab.split(/\r?\n/);

  const getHabs = await verifyHabilidades();
  const getTabs = await verifyTabulacoes();

  const allHabsExist = habsArray.every(habId => getHabs.includes(habId));
  const allTabsExist = tabsArray.every(tabId => getTabs.includes(tabId));

    if (!allHabsExist || !allTabsExist) {
      toast.error("Alguns desses IDS não existe na instância logada!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }else {
      if (habsArray.some(id => !isUUID(id.trim())) || tabsArray.some(id => !isUUID(id.trim()))) {
        habsArray = [];
        tabsArray = [];
      } else {
        habsArray = habsArray.filter(id => Boolean(id) && isUUID(id.trim()));
        tabsArray = tabsArray.filter(id => Boolean(id) && isUUID(id.trim()));
      }

      const formattedHabs = `[${habsArray.map(id => JSON.stringify(id.trim())).join(',')}]`;
      const formattedTabs = `[${tabsArray.map(id => JSON.stringify(id.trim())).join(',')}]`;

      await handleSave(formattedHabs, formattedTabs);
    }


}

  return (
    <aside className={style.AsideContainer}>
      <div className={style.AsideContainerCheckbox}>
        <form action="">
          <h1>Adicionar Gatilhos</h1>
          <br />
          <div className={style.AsideContainerCheckBoxIcon}>
            <Select styles={customStyles} options={options} onChange={handleSelectChange} />
          </div>
          <label style={{ color: 'white' }}>{selectedFluxo ? `Fluxo selecionado: ${selectedFluxo.value}`: ''}</label>
        </form>
      </div>
      <div className={style.AsideContainerTextArea} style={{ position: 'relative', zIndex: 0 }}>
        <div>
          <h1>Habilidades</h1>
          <AceEditor
            mode="json"
            theme="monokai"
            onChange={handleChange}
            name="Habilidade"
            editorProps={{ $blockScrolling: true }}
            value={hab}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2,
              useWorker: false,
              highlightActiveLine: true,
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showPrintMargin: false,
              wrap: true,
              highlightSelectedWord: true,
              animatedScroll: true,
              displayIndentGuides: true,
            }}
          />
        </div>
        <div>
        <h1>Tabulações</h1>
          <AceEditor
            mode="json"
            theme="monokai"
            onChange={handleChange2}
            name="Tabulação"
            editorProps={{ $blockScrolling: true }}
            value={tab}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2,
              useWorker: false,
              highlightActiveLine: true,
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showPrintMargin: false,
              wrap: true,
              highlightSelectedWord: true,
              animatedScroll: true,
              displayIndentGuides: true,
            }}
          />
        </div>
      </div>
      <div className={style.AsideContainerButton}>
        <div className={style.AsideContainerButtonSalvar} onClick={formatJson}><a>Salvar</a></div>
        <div className={style.AsideContainerButtonPublicar} onClick={publish}><a>Publicar</a></div>        
      </div>
    </aside>
  );
}