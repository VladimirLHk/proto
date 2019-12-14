import React from 'react'
import $ from 'jquery';
import Button from "../button/button";

const truncateString = (name, nameMaxLength) => {
  return name.length > nameMaxLength ? name.slice(0,nameMaxLength-1)+'\u2026' : name;

};

class TreeStructure extends React.Component {
  componentDidMount() {
    $(function(){
      $('[data-toggle="tree_tooltip"]').tooltip({trigger: "hover"});
    });}

  render() {
    let {treeElements, levelMark, className, onClick = ()=>{}, nameMaxLength} = this.props;
    return (
      <div className={"row"}>
        <div>
          {treeElements.map((item, index) => {
            let treeElementId = item.id ? item.id : 'tree-'+index;
            return (
              <div key={treeElementId} id={treeElementId} data-toggle="tree_tooltip"  title={item.name}>
                {levelMark.repeat(item.level)}
                <Button
                  className={className}
                  onClick={onClick}
                  name={truncateString(item.name, nameMaxLength)}/>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default TreeStructure;