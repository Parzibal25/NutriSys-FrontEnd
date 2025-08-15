import { useState, useEffect, use } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faPlus,
  faEdit,
  faTrash,
  faSave,
  faTimes,
  faImage,
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

export default function MarketplaceDoc() {
  const [products, setProducts] = useState([]);

  function fetchProducts() {
    fetch(`http://127.0.0.1:8000/api/productos/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        return response.json();
      })
      .then((data) => {
        const userId = sessionStorage.getItem("user_id");
        const filteredData = data.filter(
          (product) => product.nutricionista === parseInt(userId)
        );

        const updatedData = filteredData.map((product) => ({
          ...product,
          available: product.cantidad_disponible > 0,
        }));

        setProducts(updatedData);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  useEffect(() => {
    fetchProducts();
    console.log(sessionStorage.getItem("user_id"));
  }, []);

  // Estados para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("nombre");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterAvailable, setFilterAvailable] = useState("all");

  // Estados para edición/creación
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editForm, setEditForm] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    cantidad_disponible: "",
    available: true,
    imagen_url: null,
    nutricionista: sessionStorage.getItem("user_id"),
  });

  // Estados para modales
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Filtrar y ordenar productos
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesAvailability =
        filterAvailable === "all" ||
        (filterAvailable === "available" && product.available) ||
        (filterAvailable === "unavailable" && !product.available);
      return matchesSearch && matchesAvailability;
    })
    .sort((a, b) => {
      let valueA, valueB;

      switch (sortBy) {
        case "precio":
          valueA = a.precio;
          valueB = b.precio;
          break;
        case "cantidad_disponible":
          valueA = a.cantidad_disponible;
          valueB = b.cantidad_disponible;
          break;
        default:
          valueA = a.nombre.toLowerCase();
          valueB = b.nombre.toLowerCase();
      }

      if (sortOrder === "asc") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

  // Funciones de manejo
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return faSort;
    return sortOrder === "asc" ? faSortUp : faSortDown;
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsCreating(false);
    setEditForm({
      id: product.id,
      nutricionista: product.nutricionista,
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio.toString(),
      cantidad_disponible: product.cantidad_disponible.toString(),
      available: product.available,
      imagen_url: product.imagen_url,
    });
  };

  const handleCreateNew = () => {
    setSelectedProduct(null);
    setIsCreating(true);
    setEditForm({
      id: null,
      nutricionista: sessionStorage.getItem("user_id"),
      nombre: "",
      descripcion: "",
      precio: "",
      cantidad_disponible: "",
      available: true,
      imagen_url: null,
    });
  };

  const handleSave = () => {
    if (
      !editForm.nombre ||
      !editForm.descripcion ||
      !editForm.precio ||
      !editForm.cantidad_disponible
    ) {
      alert("Por favor complete todos los campos obligatorios");
      return;
    }

    const productData = {
      id: editForm.id,
      nutricionista: parseInt(editForm.nutricionista),
      nombre: editForm.nombre,
      descripcion: editForm.descripcion,
      precio: parseFloat(editForm.precio),
      cantidad_disponible: parseInt(editForm.cantidad_disponible),
      available: editForm.available,
      imagen_url: editForm.imagen_url,
    };

    if (!editForm.imagen_url) {
      productData.imagen_url = "https://via.placeholder.com/150";
    }

    if (isCreating) {
      fetch("http://127.0.0.1:8000/api/productos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al crear el producto");
          }
          alert("Producto creado exitosamente");
          fetchProducts();
          return response.json();
        })
        .catch((error) => {
          console.error("Error creating products:", error);
        });
    } else {
      fetch(`http://127.0.0.1:8000/api/productos/${editForm.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al actualizar el producto");
          }
          alert("Producto actualizado exitosamente");
          fetchProducts();
          return response.json();
        })
        .catch((error) => {
          console.error("Error updating products:", error);
        });
    }

    setSelectedProduct(null);
    setIsCreating(false);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    fetch(`http://127.0.0.1:8000/api/productos/${editForm.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar el producto");
        }
        alert("Producto eliminado exitosamente");
        fetchProducts();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });

    setShowDeleteModal(false);
    setProductToDelete(null);

    if (
      selectedProduct &&
      productToDelete &&
      selectedProduct.id === productToDelete.id
    ) {
      setSelectedProduct(null);
      setIsCreating(false);
    }
  };

  const handleimagen_urlUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditForm({ ...editForm, imagen_url: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div
        id="content"
        className="bg-nutrisys-background-200 rounded-2xl w-full h-full p-6 flex gap-6"
      >
        {/* Panel Izquierdo - Lista de Productos */}
        <div className="w-1/3 bg-white rounded-xl p-4 flex flex-col">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-nutrisys-primary-500 font-kodchasan mb-4">
              Mis Productos
            </h2>

            {/* Búsqueda */}
            <div className="relative mb-4">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="font-montserrat w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutrisys-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filtros */}
            <div className="mb-4 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <FontAwesomeIcon icon={faFilter} className="text-gray-600" />
                <span className="font-medium text-gray-700 font-montserrat">
                  Filtros:
                </span>
              </div>

              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutrisys-primary font-montserrat"
                value={filterAvailable}
                onChange={(e) => setFilterAvailable(e.target.value)}
              >
                <option value="all">Todos los productos</option>
                <option value="available">Disponibles</option>
                <option value="unavailable">No disponibles</option>
              </select>
            </div>

            {/* Ordenamiento */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => handleSort("nombre")}
                className={`button flex-1 text-xs py-2 ${
                  sortBy === "nombre"
                    ? "bg-nutrisys-primary-200 text-black font-bold border border-nutrisys-primary-500"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <FontAwesomeIcon
                  icon={getSortIcon("nombre")}
                  className="mr-1"
                />
                Nombre
              </button>
              <button
                onClick={() => handleSort("precio")}
                className={`button flex-1 text-xs py-2 ${
                  sortBy === "precio"
                    ? "bg-nutrisys-primary-200 text-black font-bold border border-nutrisys-primary-500"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <FontAwesomeIcon
                  icon={getSortIcon("precio")}
                  className="mr-1"
                />
                Precio
              </button>
              <button
                onClick={() => handleSort("cantidad_disponible")}
                className={`button flex-1 text-xs py-2 ${
                  sortBy === "cantidad_disponible"
                    ? "bg-nutrisys-primary-200 text-black font-bold border border-nutrisys-primary-500"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <FontAwesomeIcon
                  icon={getSortIcon("cantidad_disponible")}
                  className="mr-1"
                />
                stock
              </button>
            </div>

            {/* Botón Agregar Producto */}
            <button
              onClick={handleCreateNew}
              className="button w-full bg-green-600 text-white py-2 mb-4 hover:bg-green-700"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Agregar Producto
            </button>
          </div>

          {/* Lista de Productos */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors font-montserrat ${
                  selectedProduct?.id === product.id
                    ? "border-nutrisys-primary-500 bg-nutrisys-primary-50"
                    : "border-nutrisys-background-200 bg-white hover:border-nutrisys-secondary-500"
                }`}
                onClick={() => handleProductSelect(product)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800 text-sm">
                    {product.nombre}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      product.available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.available ? "Disponible" : "No disponible"}
                  </span>
                </div>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                  {product.descripcion}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-nutrisys-primary">
                    L. {product.precio}
                  </span>
                  <span className="text-xs text-gray-500">
                    cantidad_disponible: {product.cantidad_disponible}
                  </span>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No se encontraron productos
              </div>
            )}
          </div>
        </div>

        {/* Panel Derecho - Edición/Creación */}
        <div className="w-2/3 bg-white rounded-xl p-6 font-montserrat">
          {selectedProduct || isCreating ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-nutrisys-primary">
                  {isCreating ? "Agregar Nuevo Producto" : "Editar Producto"}
                </h2>
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    setIsCreating(false);
                  }}
                  className="button bg-gray-500 text-white px-4 py-2 hover:bg-gray-600"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              <div className="space-y-6">
                {/* imagen del Producto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    imagen del Producto
                  </label>
                  <div className="flex items-center space-x-4 flex-row">
                    <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                      {editForm.imagen_url ? (
                        <img
                          src={editForm.imagen_url}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faImage}
                          className="text-gray-400 text-2xl"
                        />
                      )}
                    </div>
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*"
                      onChange={handleimagen_urlUpload}
                      className="hidden"
                    />
                    {/*Inout file personalizado*/}
                    <label
                      htmlFor="file-upload"
                      className="button block w-fit text-sm text-gray-500"
                    >
                      Seleccionar archivo
                    </label>

                    {/* Nombre del archivo */}
                    {editForm.imagen_url && (
                      <span className="text-sm font-semibold text-gray-600 truncate w-half">
                        Archivo seleccionado:{" "}
                        {editForm.imagen_url
                          ? `${editForm.imagen_url}`
                          : "No se ha seleccionado ningun archivo"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Producto *
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutrisys-primary"
                    placeholder="Ingrese el nombre del producto"
                    value={editForm.nombre}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        nombre: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción *
                  </label>
                  <textarea
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutrisys-primary"
                    placeholder="Describa el producto, beneficios, ingredientes, etc."
                    value={editForm.descripcion}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        descripcion: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Precio y cantidad_disponible */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio (Lempiras) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutrisys-primary"
                      placeholder="0.00"
                      value={editForm.precio}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          precio: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cantidad en stock *
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutrisys-primary"
                      placeholder="0"
                      value={editForm.cantidad_disponible}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          cantidad_disponible: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Disponibilidad */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="available"
                    checked={editForm.available}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        available: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-nutrisys-primary border-gray-300 rounded focus:ring-nutrisys-primary"
                  />
                  <label
                    htmlFor="available"
                    className="text-sm font-medium text-gray-700"
                  >
                    Producto disponible para la venta
                  </label>
                </div>

                {/* Botones de Acción */}
                <div className="flex justify-between pt-6">
                  <div>
                    {!isCreating && (
                      <button
                        onClick={() => handleDelete(selectedProduct)}
                        className="button bg-red-600 text-white px-6 py-2 hover:bg-red-700"
                      >
                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                        Eliminar
                      </button>
                    )}
                  </div>
                  <button
                    onClick={handleSave}
                    className="button bg-nutrisys-primary-500 text-white px-6 py-2 hover:bg-nutrisys-primary/90"
                  >
                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                    {isCreating ? "Crear Producto" : "Guardar Cambios"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 font-montserrat">
              <FontAwesomeIcon
                icon={faEdit}
                className="text-6xl mb-4 text-nutrisys-secondary-500"
              />
              <h3 className="text-xl font-bold mb-2 text-nutrisys-secondary-500">
                Selecciona un producto para editar
              </h3>
              <p className="text-center font-semibold">
                Elige un producto de la lista de la izquierda para editarlo, o
                haz clic en "Agregar Producto" para crear uno nuevo.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Confirmar Eliminación
            </h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar el producto "
              {productToDelete?.nombre}"? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="button bg-gray-500 text-white px-4 py-2 hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="button bg-red-600 text-white px-4 py-2 hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
