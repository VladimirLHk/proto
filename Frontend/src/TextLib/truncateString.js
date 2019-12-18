export default (name, nameMaxLength) => {
  return name.length > nameMaxLength ? name.slice(0,nameMaxLength-1)+'\u2026' : name;
};
