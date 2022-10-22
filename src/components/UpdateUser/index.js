import React, { useState, useEffect } from "react";

const UpdateUser = props => {
  const [user, setUser] = useState(props.currentUser);

  const onInputChange = event => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.updateUser(user.id, user);
      }}
    >
      <div className="form-group">
        <label>Order Id</label>
        <input
          type="text"
          name="order_id"
          value={user.order_id}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Freight value</label>
        <input
          type="number"
          name="freight_value"
          value={user.freight_value}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Order Item Id</label>
        <input
          type="number"
          name="order_item_id"
          value={user.order_item_id}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={user.price}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Update</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateUser;
