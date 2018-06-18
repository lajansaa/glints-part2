/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CollectionsPage extends Component {

  render() {

    // const renderCollections = this.props.restaurantList.map((restaurant, index) => {
    //   return (
    //     <div key={index}>
    //       <table>
    //         <tr>
    //           <th>Restaurant</th>
    //           <th>Time</th>
    //         </tr>
    //       </table>
    //     </div>
    //   );
    // });

    return (
      <div>
        <h1>Collections <Link to={'/'} style={{ fontSize: '1rem', color: 'black'}}>Restaurants</Link></h1>
        
      </div>
    )
  }
}

export default CollectionsPage;