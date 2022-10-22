/* eslint-disable no-self-compare */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  getCreatedUser,
  getUpdatedUser,
  getDeletedUser
} from "./app/api";

// Styles
import "./app.scss";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import DataTable from "./components/DataTable";
import UpdateUser from "./components/UpdateUser";
import DeleteUser from "./components/DeleteUser";
import Modal from "./components/Modal";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import MySwal from "./index";

function App() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const [loading, setLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    freight_value: '',
    order_id: '',
    order_item_id: '',
    price: '',
    product_id: '',
    seller_id: '',
    shipping_limit_date: '',
  });
  const [activeModal, setActiveModal] = useState({ name: "", active: false });
  const [savedUsers, setSavedUsers] = useState(users);
  const [pageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  const usersLastIndex = currentPage * pageSize;
  const usersFirstIndex = usersLastIndex - pageSize;
  const currentUsers = users.slice(usersFirstIndex, usersLastIndex);

  // Setting up Modal
  const setModal = modal => {
    setActiveModal({ name: modal, active: true });
  };

  // Pagination
  const paginate = page => {
    setCurrentPage(page);
  };



  // Update User
  const updateRow = user => {
    setModal("Update Order");

    setCurrentUser({
      freight_value: user.freight_value,
      order_id: user.order_id,
      order_item_id: user.order_item_id,
      price: user.price,
      product_id: user.product_id,
      seller_id: user.seller_id,
      shipping_limit_date: user.shipping_limit_date,
    });
  };

  const updateUser = async (id, updatedUser) => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getUpdatedUser(id, updatedUser).then(res => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "User updated successfully."
        }).then(() => {
          dispatch({
            type: "SET_USERS",
            data: users.map(user =>
              user.seller_id === updatedUser.seller_id ? Object.assign(user, result) : user
            )
          });
          window.location.reload();
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to update user."
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete Order
  const deleteRow = user => {
    setModal("Delete Order");

    setCurrentUser({
      freight_value: user.freight_value,
      order_id: user.order_id,
      order_item_id: user.order_item_id,
      price: user.price,
      product_id: user.product_id,
      seller_id: user.seller_id,
      shipping_limit_date: user.shipping_limit_date,
    });
  };

  const deleteUser = async user => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getDeletedUser(user).then(() => {
        MySwal.fire({
          icon: "success",
          title: "User deleted successfully."
        }).then(() => {
          dispatch({
            type: "SET_USERS",
            data: users.filter(user => user.seller_id !== user.seller_id)
          });
          setSavedUsers(savedUsers.filter(user => user.seller_id !== user.seller_id));
          setCurrentPage(1);
          window.location.reload();
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to delete order."
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);

    try {
      await getUsers().then(({ data }) => {
        console.log(data.data.data)
        setSavedUsers(data.data.data);
        dispatch({ type: "SET_USERS", data: data.data.data });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch users."
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="content">
        <div className="container">
          {loading ? (
            <Loader />
          ) : (
            <div className="content-wrapper">
              <DataTable
                users={currentUsers}
                updateRow={updateRow}
                deleteRow={deleteRow}
              />
              <Pagination
                totalResults={users.length}
                currentPage={currentPage}
                pageSize={pageSize}
                paginate={paginate}
              />
            </div>
          )}
        </div>
      </main>
      {activeModal.active && (
        <Modal activeModal={activeModal}>
          {activeModal.name === "Update Order" && (
            <UpdateUser
              currentUser={currentUser}
              updateUser={updateUser}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Delete Order" && (
            <DeleteUser
              currentUser={currentUser}
              deleteUser={deleteUser}
              setActiveModal={setActiveModal}
            />
          )}
        </Modal>
      )}
      <Footer />
    </div>
  );
}

export default App;
