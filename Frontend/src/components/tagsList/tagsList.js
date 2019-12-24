import React from 'react';
import NameInput from "../../components/NameInput/nameInput";

const TagsList = ({ title, tagsList, okOnClick=()=>{}, cancelOnClick=()=>{}, changeTagStatus=()=>{} }) => {
  return (
    <div>
      <h4>{title}</h4>
      <NameInput
        inputButton={{
          id: "newTagName",
          onInput: () => {},
          placeholder: "Название признака",
          className:"",
        }}
        okButton = {{
          id: "newTagCreate",
          onClick: okOnClick,
          className: "",
        }}
        cancelButton = {{
          id: "newTagCancel",
          onClick: cancelOnClick,
          className: "",
        }}
      />
      <div>
        {
          tagsList.map((item, index) => {
            return <p key={'tag'+index} className={""}>
              <input
                type={'checkbox'}
                className={""}
                id={item.id}
                checked={item.switchOn}
                onChange={changeTagStatus}/>
              {item.name}
            </p>
          })
        }
      </div>
    </div>
  )
};

export default TagsList;