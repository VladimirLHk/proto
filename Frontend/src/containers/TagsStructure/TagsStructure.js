import React from 'react';
import NameInput from "../../components/NameInput/nameInput";
import {tagAdd, changeTagStatus} from "../../Redux/actions";
import {connect} from "react-redux";

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

const mapStateToProps = (state) => {
  return {
    title: "Список признаков",
    tagsList: state.tagsOperations.tagsSet
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    okOnClick: ()=>{
      let newTagName = document.getElementById('newTagName').value;
      if (!newTagName) {
        return
      }
      dispatch(tagAdd({newTagName}))
    },
    cancelOnClick: ()=>{},
    changeTagStatus: (e)=>{
      let tagId = e.target.id;
      dispatch(changeTagStatus({tagId}))
    },
  }
};

const TagsStructure = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TagsList);

export default TagsStructure;