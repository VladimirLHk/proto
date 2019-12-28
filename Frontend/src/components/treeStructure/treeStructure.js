import React from 'react'
import $ from 'jquery';
import Button from "../button/button";
import NameInput from "../NameInput/nameInput";

const MARGINS = ' mt-1 mb-1';

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
                  groupWrapClass = {"d-inline-block "+MARGINS}
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
