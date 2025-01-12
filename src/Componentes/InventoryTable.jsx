import React from 'react';

const InventoryTable = ({ inventory, deletePiece, startEditPiece }) => {
  return (
    <div className="table-responsive mt-4">
      <table className="table table-striped table-hover text-center shadow">
        <thead className="thead-dark">
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => startEditPiece(item)}
                >
                  Actualizar
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deletePiece(item.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
