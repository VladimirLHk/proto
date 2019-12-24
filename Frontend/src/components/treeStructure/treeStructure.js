import React from 'react'
import $ from 'jquery';
import Button from "../button/button";
import NameInput from "../NameInput/nameInput";

class TreeStructure extends React.Component {
  componentDidMount() {
    $(function(){
      $('[data-toggle="tree_tooltip"]').tooltip({trigger: "hover"});
    });}

  render() {
    console.log('TreeStructure', this.props);
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
          {title && <h4>{title}</h4>}
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
