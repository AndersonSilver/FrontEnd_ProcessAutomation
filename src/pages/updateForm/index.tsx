import React, { useContext, useEffect, useState } from 'react';
import { HeaderHome } from '../../components/Header';
import style from './style.module.scss';
import { setupApiGetForms, setupApiSaveAndPublishForm } from '@/src/services/setupApis';
import { AuthContext } from '../../context/AuthContext';
import { Bounce, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faFile, faObjectGroup } from '@fortawesome/free-solid-svg-icons';

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

  const [groups, setGroups] = useState<Group[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const { user } = useContext(AuthContext);
  const [aliasForm, setAliasForm] = useState('');
  const [nameForm, setNameForm] = useState('');
  const [showTopContainer, setShowTopContainer] = useState(false);
  const [skillIdForm, setSkillIdForm] = useState('');
  const [tabIdForm, setTabIdForm] = useState('');
  const [aliasFormResult, setAliasFormResult] = useState('');
  const [formId, setFormId] = useState('');
  const [idFormSaved, setIdFormSaved] = useState('');
  const [itemId, setItemId] = useState('');
  const [buttonSave, setButtonSave] = useState(false);
  const [buttonPublish, setButtonPublish] = useState(false);

  const handleAddFieldOutsideGroup = () => {
    const newField: Field = {
      id: '',
      name: '',
      type: 'field',
      fieldType: 'short_text',
      settings: {
        placeholder: `Digite o nome do campo`,
      }
    };
    setFields([newField, ...fields])
  };

  const handleAddAttachmentsFieldOutsideGroup = () => {
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
    setFields([newField, ...fields]);
  };

  const handleAddGroup = () => {
    const newGroup: Group = {
      id: '',
      name: '',
      fields: [],
    };
    setGroups([newGroup, ...groups]);
  };

  const handleAddField = (groupId?: string, isAttachmentField?: boolean) => {
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
      const newGroups = [...groups];
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
        setGroups(newGroups);
      }
    } else {
      toast.warn('Por favor, selecione um grupo antes de adicionar um campo de anexo!', {
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
    const newGroups = [...groups];
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
      setGroups(newGroups);
    }
  };

  const loadJSONData = (jsonData: any) => {
    const loadedGroups: Group[] = [];
    const loadedFields: Field[] = [];

    if (jsonData.children && Array.isArray(jsonData.children)) {
      jsonData.children.forEach((item: any) => {
        if (item.type === 'group') {

          const group: Group = {
            id: item.id || '',
            name: item.name || '',
            fields: item.children.map((field: any) => {

              const fieldData: Field | FieldAttachments = {
                id: field.id || '',
                name: field.name || ''
              };

              const fieldAttachment: FieldAttachments = {
                id: field.id || '',
                name: field.name || '',
                type: 'field',
                settings: {
                  sizeLimit: field.settings.sizeLimit,
                  allowedTypes: field.settings.allowedTypes,
                },
                fieldType: 'multiple_files',
              };

              if (field.fieldType === 'multiple_files') {
                return fieldAttachment;
              }

              return fieldData;
            }),
          };

          loadedGroups.push(group);
        } else if (item.type === 'field') {
          const field: Field = {
            id: item.id || '',
            name: item.name || ''
          };
          loadedFields.push(field);
        }
      });
    }
    setGroups(loadedGroups);
    setFields(loadedFields);
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
            "children": [
              ...groups.map(group => ({
                id: group.id,
                name: group.name,
                type: 'group',
                children: group.fields.map((field: Field) => ({
                  id: field.id,
                  name: field.name,
                  type: field.type,
                  fieldType: field.fieldType,
                  settings: field.settings
                }))
              })),
              ...fields.map((field: Field) => ({
                id: field.id,
                name: field.name,
                type: field.type,
                settings: field.settings,
                fieldType: field.fieldType
              })),]
          }
        ],
        "attachments": [] as string[],
        "personalDetails": {} as Record<string, string>
      }
    };
    fields.forEach(field => {
      if (field.fieldType === 'multiple_files') {
        const path: string = `data.${field.id}`;
        json.template.attachments.push(path);
      }
      if (field.fieldType === 'personal_details') {
        const personalDetails: any = json.template.personalDetails;
        personalDetails[field.id] = `data.${field.id}`;
      }
    });
    groups.forEach(group => {
      group.fields.forEach(field => {
        if (field.fieldType === 'multiple_files') {
          const path: string = `data.${group.id}.${field.id}`;
          json.template.attachments.push(path);
        }
        if (field.fieldType === 'personal_details') {
          const personalDetails: any = json.template.personalDetails;
          personalDetails[field.id] = `data.${group.id}.${field.id}`;
        }
      });
    });
    return json;
  };

  const handleRemoveGroup = (groupIndex: number) => {
    const newGroups = [...groups];
    newGroups.splice(groupIndex, 1);
    setGroups(newGroups);
  };

  const handleRemoveField = (groupId?: string, fieldIndex?: number) => {
    if (groupId !== undefined && fieldIndex !== undefined) {
      const newGroups = [...groups];
      const groupIndex = newGroups.findIndex(group => group.id === groupId);
      if (groupIndex !== -1) {
        newGroups[groupIndex].fields.splice(fieldIndex, 1);
        setGroups(newGroups);
      }
    } else if (fieldIndex !== undefined) {
      const newFields = [...fields];
      newFields.splice(fieldIndex, 1);
      setFields(newFields);
    }
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

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleButtonClick();
  }

  async function saveForm() {
    try {
      const json = generateJSON();

      const apiClient = setupApiSaveAndPublishForm(undefined, undefined);
      const response = await apiClient.put(`/update-form`, json,
        {
          maxBodyLength: Infinity,
        }
      );

      if (response.data) {
        toast.success('Formulário atualizado!', {
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
      setButtonPublish(true);
      setButtonSave(false);

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

  async function publishForm() {
    try {

      if (idFormSaved === '') {
        toast.error('Você precisa salvar o formulário antes de publicar!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored'
        });
        return;
      }
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAliasForm(event.target.value);
  }

  const handleButtonClick = async () => {
    if (aliasForm.trim() === '') {
      toast.warn('Por favor, insira um alias antes de buscar!', {
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
    } else {
      await getFormSideProps(aliasForm);
      setShowTopContainer(true);
      setButtonSave(true)
      setButtonPublish(false)
    }
  }

  async function getFormSideProps(aliasForm: string) {
    try {
      const alias = aliasForm
      const clientId = user.companyId//"194e2ff5-7b1b-4719-a9cd-9616259bdbc5"//user.companyId

      if (!clientId) {
        toast.error('Você precisa fazer login para buscar o form', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored'
        });
        return;
      }

      const apiClient = setupApiGetForms(undefined, undefined);
      const response = await apiClient.post(`/get-form`, {
        clientId,
        alias
      });

      setNameForm(response.data.name);
      setSkillIdForm(response.data.skillId);
      setTabIdForm(response.data.tabId);
      setAliasFormResult(aliasForm);
      setItemId(response.data.itemId);
      setFormId(response.data.id);
      loadJSONData(response.data.children);

    } catch (error) {
      toast.error('Erro ao buscar o formulário!', {
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

  async function jsonToForm() {
    const json = generateJSON();
    console.log(json);
  }

  return (
    <div>
      <HeaderHome />
      <div className={style.container}>

        <form className={style.searchForm} onSubmit={handleFormSubmit}>
          <input
            className={style.input}
            placeholder='Buscar formulário pelo alias'
            type="text"
            value={aliasForm}
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleButtonClick();
              }
            }}
          />
          <button
            type="button"
            onClick={handleButtonClick}
            className={style.button}
          >
            Buscar
          </button>
          <button
            type="button"
            onClick={() => { setButtonPublish(false), loadJSONData(""), setAliasForm(""), setShowTopContainer(false), setGroups([]), setFields([])/* , setAttachmentsFields([]) */, setNameForm(""), setSkillIdForm(""), setTabIdForm(""), setAliasFormResult("") }}
            className={style.button}
          >
            Limpar
          </button>
        </form>

        {showTopContainer && (
          <div>
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
              {/* <button type="button" onClick={jsonToForm} className={style.buttonCommand}>
                Gerar JSON
              </button> */}
              <button type="button" onClick={saveForm} className={`${style.buttonCommandSave} ${!buttonSave ? style.disabled : ''}`} disabled={!buttonSave}>
                Salvar
              </button>
              <button type="button" onClick={publishForm} className={`${style.buttonCommandPublish} ${!buttonPublish ? style.disabled : ''}`} disabled={!buttonPublish}>
                Publicar
              </button>
            </div>

            <div className={style.tabSkill}>

              <div className={style.rowObjects}>
                <p className={style.titles}>Id</p>
                <input
                  className={style.input}
                  placeholder="Insira o Id do formulário"
                  type="text"
                  value={formId}
                  onChange={handleInputNameChange}
                />
              </div>

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
                <p className={style.titles}>ItemId</p>
                <input
                  className={style.input}
                  placeholder="Insira o ItemId"
                  type="text"
                  value={itemId}
                  onChange={handleInputAliasChange}
                />
              </div>

              <div className={style.rowObjects}>
                <p className={style.titles}>Alias</p>
                <input
                  className={style.input}
                  placeholder="Insira o alias"
                  type="text"
                  value={aliasFormResult}
                  onChange={handleInputAliasChange}
                />
              </div>
            </div>
          </div>

        )}

        {fields.map((field, index) => (
          <div key={index} className={style.fieldSinGroup}>
            <div className={style.field}>
              <input
                className={style.input}
                placeholder="Digite o ID do campo"
                type="text"
                value={field.id}
                onChange={(e) => {
                  const newFields = [...fields];
                  newFields[index] = { ...newFields[index], id: e.target.value };
                  setFields(newFields);
                }}
              />
              <input
                className={style.input}
                placeholder="Digite o nome do campo"
                type="text"
                value={field.name}
                onChange={(e) => {
                  const newFields = [...fields];
                  newFields[index] = { ...newFields[index], name: e.target.value };
                  setFields(newFields);
                }}
              />
              <button type="button" onClick={() => handleRemoveField(undefined, index)} className={style.removeButton}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}

        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className={style.groupContainer}>
            <div className={style.groupField}>
              <input
                className={style.input}
                placeholder="Digite o ID do grupo"
                type="text"
                value={group.id}
                onChange={(e) => {
                  const newId = e.target.value;
                  const newGroups = [...groups];
                  newGroups[groupIndex] = { ...newGroups[groupIndex], id: newId };
                  setGroups(newGroups);
                }}
              />
              <input
                className={style.input}
                placeholder="Digite o nome do grupo"
                type="text"
                value={group.name}
                onChange={(e) => {
                  const newGroups = [...groups];
                  newGroups[groupIndex] = { ...newGroups[groupIndex], name: e.target.value };
                  setGroups(newGroups);
                }}
              />
              <button type="button" onClick={() => handleAddField(group.id, false)} className={style.button}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button type="button" onClick={() => handleAddFieldAttachments(group.id)} className={style.button}>
                <FontAwesomeIcon icon={faPlus} />
                <FontAwesomeIcon icon={faFile} />
              </button>
              <button type="button" onClick={() => handleRemoveGroup(groupIndex)} className={style.removeButton}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>

            {group.fields.map((field, fieldIndex) => (
              <div key={fieldIndex} className={style.fieldContainerGroup}>
                <input
                  className={style.input}
                  placeholder="Digite o ID do campo"
                  type="text"
                  value={field.id}
                  onChange={(e) => {
                    const newGroups = [...groups];
                    newGroups[groupIndex].fields[fieldIndex] = {
                      ...newGroups[groupIndex].fields[fieldIndex],
                      id: e.target.value
                    };
                    setGroups(newGroups);
                  }}
                />
                <input
                  className={style.input}
                  placeholder="Digite o nome do campo"
                  type="text"
                  value={field.name}
                  onChange={(e) => {
                    const newGroups = [...groups];
                    newGroups[groupIndex].fields[fieldIndex] = {
                      ...newGroups[groupIndex].fields[fieldIndex],
                      name: e.target.value
                    };
                    setGroups(newGroups);
                  }}
                />
                <button type="button" onClick={() => handleRemoveField(group.id, fieldIndex)} className={style.removeButton}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

}