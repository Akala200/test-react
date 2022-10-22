import React from "react";

// Styles
import "./style.scss";

// Images
import SortIcon from "../../img/sort-icon.png";

const DataTable = props => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th
              onClick={() => {
                props.onSortChange("name");
              }}
            >
              <span className="column-sort">
              Order id
                <img src={SortIcon} alt="First Name" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("surname");
              }}
            >
              <span className="column-sort">
              Order item id
                <img src={SortIcon} alt="Last Name" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("email");
              }}
            >
              <span className="column-sort">
              Price id
                <img src={SortIcon} alt="E-Mail" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("email");
              }}
            >
              <span className="column-sort">
              Product id
                <img src={SortIcon} alt="E-Mail" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("email");
              }}
            >
              <span className="column-sort">
              Seller id
                <img src={SortIcon} alt="E-Mail" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("email");
              }}
            >
              <span className="column-sort">
              Limit_date
                <img src={SortIcon} alt="E-Mail" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("email");
              }}
            >
              <span className="column-sort">
              Freight value
                <img src={SortIcon} alt="E-Mail" />
              </span>
            </th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.users.length ? (
            props.users.map(user => (
              <tr key={user._id}>      
                <td>{user.order_id}</td>
                <td>{user.order_item_id}</td>
                <td>{user.price}</td>
                <td>{user.product_id}</td>
                <td>{user.seller_id}</td>
                <td>{user.shipping_limit_date}</td>
                <td>{user.freight_value}</td>
                <td className="field-actions">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      props.updateRow(user);
                    }}
                  >
                    Update
                  </button>
                </td>
                <td className="field-actions">
                  <button
                    className="field-actions__delete"
                    onClick={() => props.deleteRow(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">
                <div className="no-record-message">No Record!</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
