const If = props => {
    if( props.condition === null ) {
        return null;
    } else {
        return props.children
    }
};
  
  export default If;