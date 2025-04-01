// import React from "react";

// const AdminDashboard = () => {
//   const showHeader = () => {
//     <div className="bg-dark text-white py-4">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-6">
//             <h1>
//               <i className="fas fa-home">Dashboard</i>
//             </h1>
//             <h2>Hello This is react</h2>
//           </div>
//         </div>
//       </div>
//     </div>;
//   };
//   return <section>{showHeader()}</section>;
// };

// export default AdminDashboard;


import React from "react";

const AdminDashboard = () => {
  return (
    <section>
      <div className="bg-dark text-black py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-home">Dashboard</i> Dashboard
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;

