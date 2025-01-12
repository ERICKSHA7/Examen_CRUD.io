import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import '../index.css';

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [newPiece, setNewPiece] = useState({ name: '', quantity: '', price: '' });
  const [editPiece, setEditPiece] = useState(null); // Control del estado para edición

  // Referencia a la colección Firestore
  const inventoryCollection = collection(db, 'inventory');

  // Función para obtener el inventario desde Firestore
  const fetchInventory = async () => {
    try {
      const data = await getDocs(inventoryCollection);
      const items = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, // Incluimos el ID del documento
      }));
      setInventory(items);
    } catch (error) {
      console.error('Error al obtener inventario:', error);
    }
  };

  // Función para agregar un nuevo elemento al inventario
  const addPiece = async (e) => {
    e.preventDefault();
    try {
      await addDoc(inventoryCollection, newPiece);
      setNewPiece({ name: '', quantity: '', price: '' });
      fetchInventory();
    } catch (error) {
      console.error('Error al agregar pieza:', error);
    }
  };

  // Función para eliminar un elemento del inventario
  const deletePiece = async (id) => {
    try {
      await deleteDoc(doc(db, 'inventory', id));
      fetchInventory();
    } catch (error) {
      console.error('Error al eliminar pieza:', error);
    }
  };

  // Función para habilitar la edición de un elemento
  const startEditPiece = (item) => {
    setEditPiece({ ...item }); // Copiamos los datos del elemento a editar
  };

  // Función para guardar las modificaciones del elemento
  const saveEditPiece = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'inventory', editPiece.id), {
        name: editPiece.name,
        quantity: editPiece.quantity,
        price: editPiece.price,
      });
      setEditPiece(null); // Salimos del modo edición
      fetchInventory();
    } catch (error) {
      console.error('Error al actualizar pieza:', error);
    }
  };

  // Cargar el inventario cuando el componente se monte
  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="container">
      <h2>Gestión de Inventario</h2>
      <form onSubmit={addPiece} className="input-group">
        <input
          type="text"
          placeholder="Nombre"
          value={newPiece.name}
          onChange={(e) => setNewPiece({ ...newPiece, name: e.target.value })}
          required
          className="form-control"
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={newPiece.quantity}
          onChange={(e) => setNewPiece({ ...newPiece, quantity: e.target.value })}
          required
          className="form-control"
        />
        <input
          type="number"
          placeholder="Precio"
          value={newPiece.price}
          onChange={(e) => setNewPiece({ ...newPiece, price: e.target.value })}
          required
          className="form-control"
        />
        <button type="submit" className="btn btn-dark">
          Agregar
        </button>
      </form>

      <table className="table mt-4 shadow-lg">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td> {/* Añadido el símbolo de $ en el precio */}
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deletePiece(item.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => startEditPiece(item)}
                >
                  Actualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editPiece && (
        <div className="edit-form">
          <h3>Editar Pieza</h3>
          <form onSubmit={saveEditPiece}>
            <input
              type="text"
              value={editPiece.name}
              onChange={(e) => setEditPiece({ ...editPiece, name: e.target.value })}
              required
              className="form-control mb-3 shadow-lg"
            />
            <input
              type="number"
              value={editPiece.quantity}
              onChange={(e) => setEditPiece({ ...editPiece, quantity: e.target.value })}
              required
              className="form-control mb-3 shadow-lg"
            />
            <input
              type="number"
              value={editPiece.price}
              onChange={(e) => setEditPiece({ ...editPiece, price: e.target.value })}
              required
              className="form-control mb-3 shadow-lg"
            />
            <br />
            <button type="submit" className="btn btn-success">
              Guardar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditPiece(null)}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
