import React from 'react';
import NameInput from "../../components/NameInput/nameInput";

const TagsList = ({ title, tagsList, okOnClick=()=>{}, cancelOnClick=()=>{}, changeTagStatus=()=>{} }) => {
  return (
    <div>
      <h4>{title}</h4>
      <NameInput
        groupWrapClass={"mb-2"}
        inputButton={{
          id: "newTagName",
          onInput: () => {},
          placeholder: "Добавить признак",
          className:"v-center",
        }}
        okButton = {{
          id: "newTagCreate",
          onClick: okOnClick,
          className: "",
        }}
        cancelButton = {{
          id: "",
          onClick: cancelOnClick,
          className: "",
        }}
      />

        {
          tagsList.map((item, index) => {
            return <div key={'tag'+index} className={""}>
              <input
                type={'checkbox'}
                className={""}
                id={item.id}
                checked={item.switchOn}
                onChange={changeTagStatus}/>
              {item.name}
            </div>
          })
        }
    </div>
  )
};

export default TagsList;