import React from 'react'
import $ from 'jquery';
import Button from "../button/button";
import NameInput from "../NameInput/nameInput";

// const truncateString = (name, nameMaxLength) => {
//   return name.length > nameMaxLength ? name.slice(0,nameMaxLength-1)+'\u2026' : name;
//
// };

class TreeStructure extends React.Component {
  componentDidMount() {
    $(function(){
      $('[data-toggle="tree_tooltip"]').tooltip({trigger: "hover"});
    });}

  render() {
    let {
      title,
      treeElements,
      levelMark,
      className,
      nodeOnClick=()=>{},
      newNodeOkOnClick=()=>{},
      newNodeCancelOnClick=()=>{}
    } = this.props;
    return (
      <div className={"row "+className}>
        <div>
          {title && <h3>{title}</h3>}
          {treeElements.map((item, index) => {
            let treeElementId = item.id ? item.id : 'tree-'+index;
            return (
              <div key={treeElementId}  data-toggle="tree_tooltip"  title={item.tip}>
                {levelMark.repeat(item.level)}
                {!item.isInput && <Button
                  id={treeElementId}
                  className={item.className}
                  onClick={nodeOnClick}
                  name={item.name}
                />}
                {item.isInput && <NameInput
                  inputButton={item.inputButton}
                  okButton={{
                    ...item.okButton,
                    onClick: newNodeOkOnClick
                  }}
                  cancelButton={{
                    ...item.cancelButton,
                    onClick: newNodeCancelOnClick
                  }}
                />}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default TreeStructure;

// name={truncateString(item.name, nameMaxLength)}
