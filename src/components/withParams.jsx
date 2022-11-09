import { useParams } from "react-router-dom";
import React from 'react'
 
function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}
 
// az login --username manomambane05@gmail.com --password Mamban36260
export default withParams