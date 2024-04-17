import React, { useContext, useState } from 'react';
import { HeaderHome } from '../../components/Header';
import style from './style.module.scss';
import { AuthContext } from '../../context/AuthContext';
import { Bounce, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faFile, faObjectGroup } from '@fortawesome/free-solid-svg-icons';
import { setupApiSaveAndPublishForm, setupApiGetTabAndSkill } from '@/src/services/setupApis';

interface Field {
  id: string;
  name: string;
  type?: string;
  fieldType?: string;
  settings?: {
    autofillParam?: string;
    detail?: string;
    placeholder?: string;
    sizeLimit?: { max: number; enabled: boolean; };
    allowedTypes?: string[];
  };
}

interface FieldAttachments {
  id: string;
  name: string;
  type: string;
  settings?: {
    sizeLimit?: { max: number, enabled: boolean };
    allowedTypes?: string[];
  }
  fieldType: string;
}

interface Group {
  id: string;
  name: string;
  fields: Field[] | FieldAttachments[];
}

export default function Dashboard() {

  const personalDetails = [{
    "id": "customerEmail",
    "name": "Email",
    "type": "field",
    "settings": {
      "detail": "customerEmail",
      "placeholder": "Insira seu Email",
      "autofillParam": "mail",
    },
    "fieldType": "personal_details",
  },
  {
    "id": "customerName",
    "name": "Nome do cliente",
    "type": "field",
    "settings": {
      "detail": "customerName",
      "placeholder": "Insira o Nome do cliente",
    },
    "fieldType": "personal_details",
  },
  {
    "id": "customerSocialNumber",
    "name": "CPF do cliente",
    "type": "field",
    "settings": {
      "detail": "customerSocialNumber",
      "placeholder": "Insira o CPF do cliente",
    },
    "fieldType": "personal_details",
  },
  {
    "id": "customerPhoneNumber",
    "name": "Telefone do cliente",
    "type": "field",
    "settings": {
      "detail": "customerPhoneNumber",
      "placeholder": "Insira o telefone do cliente.",
    },
    "fieldType": "personal_details",
  }]

  const [allItems, setAllItems] = useState<(Group | Field)[]>([...personalDetails]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const { user } = useContext(AuthContext);
  const [aliasForm, setAliasForm] = useState('');
  const [nameForm, setNameForm] = useState('');
  const [skillIdForm, setSkillIdForm] = useState('');
  const [tabIdForm, setTabIdForm] = useState('');
  const [idFormSaved, setIdFormSaved] = useState('');
  const [buttonSave, setButtonSave] = useState(false);
  const [buttonPublish, setButtonPublish] = useState(false);

  const handleAdditem = (newitem: Group | Field) => {
    setAllItems([newitem, ...allItems]);
  };

  async function gerarJson() {
    try {
      const json = generateJSON();
      console.log(json);

    } catch (error) {
      toast.error('Erro ao atualizar o formulário!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored'
      });
    }
  }

  const handleAddFieldOutsideGroup = () => {
    setButtonSave(true);
    const newField: Field = {
      id: '',
      name: '',
      type: 'field',
      fieldType: 'short_text',
      settings: {
        placeholder: `Digite o nome do campo`,
      }
    };
    handleAdditem(newField);
    setFields([newField, ...fields]);
  };

  const handleAddAttachmentsFieldOutsideGroup = () => {
    setButtonSave(true);
    const newField: Field = {
      id: '',
      name: '',
      type: "field",
      settings: {
        sizeLimit: { max: 10, enabled: true },
        allowedTypes: [
          "doc", "docx", "png", "jpg", "jpeg", "pdf", "xlsx",
          "xls", "eml", "msg", "txt", "xml", "xlt",
        ],
      },
      fieldType: "multiple_files",
    };
    handleAdditem(newField);
    setFields([newField, ...fields]);
  };
  const handleAddGroup = () => {
    setButtonSave(true);
    const newGroup: Group = {
      id: '',
      name: '',
      fields: [],
    };
    handleAdditem(newGroup);
    setGroups([newGroup, ...groups]);
  };

  const handleAddField = (groupId?: string, groupName?: string) => {
    if (groupId) {
      const newField: Field = {
        id: '',
        name: '',
        type: 'field',
        fieldType: 'short_text',
        settings: {
          placeholder: `Digite o nome do campo`,
        }
      };
      const newGroups = [...allItems];
      const groupIndex = newGroups.findIndex(group => group.id === groupId);
      if (groupIndex !== -1) {
        const group = newGroups[groupIndex];
        if ('fields' in group) {
          //@ts-ignore :todo
          group.fields.push(newField);
        } else {
          const newGroup = group as Group;
          newGroup.fields = [newField];
        }
        setAllItems(newGroups);
      }
    } else {
      toast.warn('Por favor, selecione um grupo antes de adicionar um campo!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const handleAddFieldAttachments = (groupId?: string) => {
    if (groupId) {
      const newField: Field = {
        id: '',
        name: '',
        type: "field",
        settings: {
          sizeLimit: { max: 10, enabled: true },
          allowedTypes: [
            "doc", "docx", "png", "jpg", "jpeg", "pdf", "xlsx",
            "xls", "eml", "msg", "txt", "xml", "xlt",
          ],
        },
        fieldType: "multiple_files",
      };
      const newGroups = [...allItems];
      const groupIndex = newGroups.findIndex(group => group.id === groupId);
      if (groupIndex !== -1) {
        const group = newGroups[groupIndex];
        if ('fields' in group) {
          //@ts-ignore :todo
          group.fields.push(newField);
        } else {
          const newGroup = group as Group;
          newGroup.fields = [newField];
        }
        setAllItems(newGroups);
      }
    } else {
      toast.warn('Por favor, selecione um grupo antes de adicionar um campo!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const generateJSON = () => {
    const json = {
      "name": nameForm,
      "skillId": skillIdForm,
      "tabId": tabIdForm,
      "aliases": [
        aliasForm
      ],
      "template": {
        "children": [
          {
            "id": "data",
            "name": nameForm,
            "type": "page",
            "children": allItems.map(item => {
              if ('fields' in item) {
                return {
                  "id": item.id,
                  "name": item.name,
                  "type": "group",
                  "children": item.fields.map(field => {
                    if (field.fieldType === 'multiple_files') {
                      return {
                        "id": field.id,
                        "name": field.name,
                        "type": "field",
                        "fieldType": "multiple_files",
                        "settings": {
                          "sizeLimit": field.settings?.sizeLimit,
                          "allowedTypes": field.settings?.allowedTypes,
                        }
                      };
                    }
                    return {
                      "id": field.id,
                      "name": field.name,
                      "type": "field",
                    };
                  })
                };
              }
              if (item.fieldType === 'multiple_files') {
                return {
                  "id": item.id,
                  "name": item.name,
                  "type": "field",
                  "fieldType": "multiple_files",
                  "settings": {
                    "sizeLimit": item.settings?.sizeLimit,
                    "allowedTypes": item.settings?.allowedTypes,
                  }
                };
              } else if (item.fieldType === 'personal_details') {
                return {
                  "id": item.id,
                  "name": item.name,
                  "type": "field",
                  "fieldType": "personal_details",
                  "settings": {
                    "detail": item.settings?.detail,
                    "placeholder": item.settings?.placeholder,
                    "autofillParam": item.settings?.autofillParam,
                  }
                };
              }
              return {
                "id": item.id,
                "name": item.name,
                "type": "field",
              };
            }
            )
          }
        ],
        "attachments": [] as string[],
        "personalDetails": {} as Record<string, string>
      }
    };

    allItems.forEach(item => {
      if ('fields' in item) {
        item.fields.forEach(field => {
          if (field.fieldType === 'multiple_files') {
            const path: string = `data.${item.id}.${field.id}`;
            json.template.attachments.push(path);
          }
          if (field.fieldType === 'personal_details') {
            const personalDetails: any = json.template.personalDetails;
            personalDetails[field.id] = `data.${item.id}.${field.id}`;
          }
        });
      } else {
        if ('fieldType' in item && item.fieldType === 'multiple_files') {
          const path: string = `data.${item.id}`;
          json.template.attachments.push(path);
        }
        if ('fieldType' in item && item.fieldType === 'personal_details') {
          const personalDetails: any = json.template.personalDetails;
          personalDetails[item.id] = `data.${item.id}`;
        }
      }
    });

    return json;
  };

  const handleRemoveGroup = (groupIdToRemove: string) => {
    const newItems = allItems.filter(item => {
      if ('id' in item) {
        return item.id !== groupIdToRemove;
      }
      return true;
    });
    setAllItems(newItems);
  };

  const handleRemoveField = (fieldIdToRemove: string) => {
    const newItems = allItems.map(item => {
      if ('fields' in item && Array.isArray(item.fields)) {
        const newFields = [];
        for (const field of item.fields) {
          if (field.id !== fieldIdToRemove) {
            newFields.push(field);
          }
        }
        return { ...item, fields: newFields };
      }
      return item;
    }).filter(item => {
      if ('id' in item) {
        return item.id !== fieldIdToRemove;
      }
      return true;
    });
    setAllItems(newItems);
  };

  const handleInputAliasChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAliasForm(event.target.value);
  }

  const handleInputSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSkillIdForm(event.target.value);
  }

  const handleInputTabChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTabIdForm(event.target.value);
  }

  const handleInputNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameForm(event.target.value);
  }

  async function saveForm() {
    const json = generateJSON();

    if (nameForm === '') {
      toast.warn('Preencha o nome', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    if (skillIdForm === '') {
      toast.warn('Preencha a habilidade!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    if (tabIdForm === '') {
      toast.warn('Preencha a tabulação!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    if (aliasForm === '') {
      toast.warn('Preencha o alias!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    try {
      const apiClient = setupApiGetTabAndSkill(undefined, undefined);
      const response = await apiClient.get(`/get-tab?tabId=${tabIdForm}`);
    } catch (error) {
      toast.error('Tabulação não encontrada!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored'
      });
    }

    try {
      const apiClient = setupApiGetTabAndSkill(undefined, undefined);
      const response = await apiClient.get(`/get-skill?skillId=${skillIdForm}`);
    } catch (error) {
      toast.error('Habilidade não encontrada!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored'
      });
    }
    try {
      const apiClient = setupApiSaveAndPublishForm(undefined, undefined);
      const response = await apiClient.put(`/update-form`, json,
        {
          maxBodyLength: Infinity,
        }
      );
      if (response.data) {
        toast.success('Formulário criado!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored'
        });
        setIdFormSaved(response.data.form.id);
      }
    } catch (error) {
      toast.error('Erro ao salvar o formulário!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored'
      });
    }
    setButtonPublish(true);
    setButtonSave(false);
  }

  async function publishForm() {
    try {
      const apiClient = setupApiSaveAndPublishForm(undefined, undefined);
      const response = await apiClient.post(`/publish-form?formId=${idFormSaved}`);

      if (response.data) {
        toast.success('Formulário publicado!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored'
        });
      }
      setButtonSave(true)
      setButtonPublish(false);

    } catch (error) {
      toast.error('Erro ao publicar o formulário!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored'
      });
    }
  }

  const handleGroupChange = (groupIndex: number, field: string, value: string) => {
    updateGroupInAllItems(groupIndex, field, value);
  };

  const handleFieldChange = (groupIndex: number, fieldIndex: number | null, field: string, value: string) => {
    const updatedItems = [...allItems];
    if ('fields' in updatedItems[groupIndex] && fieldIndex !== null) {
      const updatedGroup = { ...updatedItems[groupIndex] as Group };
      updatedGroup.fields[fieldIndex] = { ...updatedGroup.fields[fieldIndex], [field]: value };
      updatedItems[groupIndex] = updatedGroup;
    } else {
      updatedItems[groupIndex] = { ...updatedItems[groupIndex], [field]: value };
    }
    setAllItems(updatedItems);
  };

  const updateGroupInAllItems = (groupIndex: number, field: string, value: string) => {
    const updatedItems = [...allItems];
    updatedItems[groupIndex] = { ...updatedItems[groupIndex], [field]: value };
    setAllItems(updatedItems);
  };

  return (
    <div>
      <HeaderHome />
      <div className={style.container}>

        <div className={style.tabSkill}>

          <div className={style.rowObjects}>
            <p className={style.titles}>Nome</p>
            <input
              className={style.input}
              placeholder="Insira o nome do formulário"
              type="text"
              value={nameForm}
              onChange={handleInputNameChange}
            />
          </div>

          <div className={style.rowObjects}>
            <p className={style.titles}>SkillId</p>
            <input
              className={style.input}
              placeholder="Insira a skillId"
              type="text"
              value={skillIdForm}
              onChange={handleInputSkillChange}
            />
          </div>

          <div className={style.rowObjects}>
            <p className={style.titles}>TabId</p>
            <input
              className={style.input}
              placeholder="Insira a tabId"
              type="text"
              value={tabIdForm}
              onChange={handleInputTabChange}
            />
          </div>

          <div className={style.rowObjects}>
            <p className={style.titles}>Alias</p>
            <input
              className={style.input}
              placeholder="Insira o alias"
              type="text"
              value={aliasForm}
              onChange={handleInputAliasChange}
            />
          </div>

        </div>

        <div className={style.topContainer}>
          <button type="button" onClick={handleAddGroup} className={style.buttonCommand}>
            <FontAwesomeIcon icon={faPlus} />
            <FontAwesomeIcon icon={faObjectGroup} />
          </button>
          <button type="button" onClick={handleAddFieldOutsideGroup} className={style.buttonCommand}>
            <FontAwesomeIcon icon={faPlus} />
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button type="button" onClick={handleAddAttachmentsFieldOutsideGroup} className={style.buttonCommand}>
            <FontAwesomeIcon icon={faPlus} />
            <FontAwesomeIcon icon={faFile} />
          </button>

          {/* <button type="button" onClick={gerarJson} className={style.buttonCommand}>
            Gerar JSON
          </button> */}

          <button type="button" onClick={saveForm} className={`${style.buttonCommandSave} ${!buttonSave ? style.disabled : ''}`}>
            Salvar
          </button>

          <button type="button" onClick={publishForm} className={`${style.buttonCommandPublish} ${!buttonPublish ? style.disabled : ''}`} disabled={!buttonPublish}>
            Publicar
          </button>
        </div>

        {allItems.map((item, index) => (
          <div key={index} className={style.fieldSinGroup}>
            {('id' in item && 'fields' in item) ? (
              <div className={style.groupContainer}>
                <div className={style.groupField}>
                  <input
                    className={style.input}
                    placeholder="Digite o ID do grupo"
                    type="text"
                    value={item.id}
                    onChange={(e) => handleGroupChange(index, 'id', e.target.value)}
                  />
                  <input
                    className={style.input}
                    placeholder="Digite o nome do grupo"
                    type="text"
                    value={item.name}
                    onChange={(e) => handleGroupChange(index, 'name', e.target.value)}
                  />
                  <button type="button" onClick={() => handleAddField(item.id, item.name)} className={style.button}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <button type="button" onClick={() => handleAddFieldAttachments(item.id)} className={style.button}>
                    <FontAwesomeIcon icon={faPlus} />
                    <FontAwesomeIcon icon={faFile} />
                  </button>
                  <button type="button" onClick={() => handleRemoveGroup(item.id)} className={style.removeButton}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
                {(item as Group).fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className={style.fieldContainerGroup}>
                    <input
                      className={style.input}
                      placeholder="Digite o ID do campo"
                      type="text"
                      value={field.id}
                      onChange={(e) => handleFieldChange(index, fieldIndex, 'id', e.target.value)}
                    />
                    <input
                      className={style.input}
                      placeholder="Digite o nome do campo"
                      type="text"
                      value={field.name}
                      onChange={(e) => handleFieldChange(index, fieldIndex, 'name', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField(field.id)}
                      className={style.removeButton}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className={style.field}>
                <input
                  className={style.input}
                  placeholder="Digite o ID do campo"
                  type="text"
                  value={item.id}
                  onChange={(e) => handleFieldChange(index, null, 'id', e.target.value)}
                />
                <input
                  className={style.input}
                  placeholder="Digite o nome do campo"
                  type="text"
                  value={item.name}
                  onChange={(e) => handleFieldChange(index, null, 'name', e.target.value)}
                />
                <button type="button" onClick={() => handleRemoveField(item.id)} className={style.removeButton}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}
          </div>
        ))}

      </div>
    </div>
  )
}