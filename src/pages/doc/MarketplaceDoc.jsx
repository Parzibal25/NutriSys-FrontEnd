import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
} from '@fortawesome/free-solid-svg-icons';

export default function MarketplaceDoc() {
	// Estados para productos
	const [products, setProducts] = useState([
		{
			id: 1,
			name: 'Proteína Whey Premium',
			description:
				'Proteína de suero de alta calidad para desarrollo muscular',
			price: 850,
			stock: 25,
			available: true,
			image: null,
		},
		{
			id: 2,
			name: 'Multivitamínico Completo',
			description: 'Complejo vitamínico con minerales esenciales',
			price: 420,
			stock: 0,
			available: false,
			image: null,
		},
		{
			id: 3,
			name: 'Omega 3 Premium',
			description: 'Aceite de pescado purificado con EPA y DHA',
			price: 650,
			stock: 15,
			available: true,
			image: null,
		},
	]);

	// Estados para filtros y búsqueda
	const [searchTerm, setSearchTerm] = useState('');
	const [sortBy, setSortBy] = useState('name');
	const [sortOrder, setSortOrder] = useState('asc');
	const [filterAvailable, setFilterAvailable] = useState('all');

	// Estados para edición/creación
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isCreating, setIsCreating] = useState(false);
	const [editForm, setEditForm] = useState({
		name: '',
		description: '',
		price: '',
		stock: '',
		available: true,
		image: null,
	});

	// Estados para modales
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [productToDelete, setProductToDelete] = useState(null);

	// Filtrar y ordenar productos
	const filteredProducts = products
		.filter((product) => {
			const matchesSearch = product.name
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
			const matchesAvailability =
				filterAvailable === 'all' ||
				(filterAvailable === 'available' && product.available) ||
				(filterAvailable === 'unavailable' && !product.available);
			return matchesSearch && matchesAvailability;
		})
		.sort((a, b) => {
			let valueA, valueB;

			switch (sortBy) {
				case 'price':
					valueA = a.price;
					valueB = b.price;
					break;
				case 'stock':
					valueA = a.stock;
					valueB = b.stock;
					break;
				default:
					valueA = a.name.toLowerCase();
					valueB = b.name.toLowerCase();
			}

			if (sortOrder === 'asc') {
				return valueA > valueB ? 1 : -1;
			} else {
				return valueA < valueB ? 1 : -1;
			}
		});

	// Funciones de manejo
	const handleSort = (field) => {
		if (sortBy === field) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setSortBy(field);
			setSortOrder('asc');
		}
	};

	const getSortIcon = (field) => {
		if (sortBy !== field) return faSort;
		return sortOrder === 'asc' ? faSortUp : faSortDown;
	};

	const handleProductSelect = (product) => {
		setSelectedProduct(product);
		setIsCreating(false);
		setEditForm({
			name: product.name,
			description: product.description,
			price: product.price.toString(),
			stock: product.stock.toString(),
			available: product.available,
			image: product.image,
		});
	};

	const handleCreateNew = () => {
		setSelectedProduct(null);
		setIsCreating(true);
		setEditForm({
			name: '',
			description: '',
			price: '',
			stock: '',
			available: true,
			image: null,
		});
	};

	const handleSave = () => {
		if (
			!editForm.name ||
			!editForm.description ||
			!editForm.price ||
			!editForm.stock
		) {
			alert('Por favor complete todos los campos obligatorios');
			return;
		}

		const productData = {
			name: editForm.name,
			description: editForm.description,
			price: parseFloat(editForm.price),
			stock: parseInt(editForm.stock),
			available: editForm.available,
			image: editForm.image,
		};

		if (isCreating) {
			const newProduct = {
				...productData,
				id: Math.max(...products.map((p) => p.id)) + 1,
			};
			setProducts([...products, newProduct]);
			alert('Producto creado exitosamente');
		} else {
			setProducts(
				products.map((p) =>
					p.id === selectedProduct.id ? { ...p, ...productData } : p
				)
			);
			alert('Producto actualizado exitosamente');
		}

		setSelectedProduct(null);
		setIsCreating(false);
	};

	const handleDelete = (product) => {
		setProductToDelete(product);
		setShowDeleteModal(true);
	};

	const confirmDelete = () => {
		setProducts(products.filter((p) => p.id !== productToDelete.id));
		setShowDeleteModal(false);
		setProductToDelete(null);
		if (selectedProduct && selectedProduct.id === productToDelete.id) {
			setSelectedProduct(null);
			setIsCreating(false);
		}
		alert('Producto eliminado exitosamente');
	};

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setEditForm({ ...editForm, image: e.target.result });
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<>
			<div
				id='content'
				className='bg-nutrisys-background-200 rounded-2xl w-full h-full p-6 flex gap-6'
			>
				{/* Panel Izquierdo - Lista de Productos */}
				<div className='w-1/3 bg-white rounded-xl p-4 flex flex-col'>
					<div className='mb-4'>
						<h2 className='text-xl font-bold text-nutrisys-primary-500 font-kodchasan mb-4'>
							Mis Productos
						</h2>

						{/* Búsqueda */}
						<div className='relative mb-4'>
							<FontAwesomeIcon
								icon={faSearch}
								className='absolute left-3 top-3 text-gray-400'
							/>
							<input
								type='text'
								placeholder='Buscar productos...'
								className='font-montserrat w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutrisys-primary'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>

						{/* Filtros */}
						<div className='mb-4 space-y-2'>
							<div className='flex items-center gap-2 mb-2'>
								<FontAwesomeIcon
									icon={faFilter}
									className='text-gray-600'
								/>
								<span className='font-medium text-gray-700 font-montserrat'>
									Filtros:
								</span>
							</div>

							<select
								className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutrisys-primary font-montserrat'
								value={filterAvailable}
								onChange={(e) =>
									setFilterAvailable(e.target.value)
								}
							>
								<option value='all'>Todos los productos</option>
								<option value='available'>Disponibles</option>
								<option value='unavailable'>
									No disponibles
								</option>
							</select>
						</div>

						{/* Ordenamiento */}
						<div className='flex gap-2 mb-4'>
							<button
								onClick={() => handleSort('name')}
								className={`button flex-1 text-xs py-2 ${
									sortBy === 'name'
										? 'bg-nutrisys-primary-200 text-black font-bold border border-nutrisys-primary-500'
										: 'bg-gray-200 text-gray-700'
								}`}
							>
								<FontAwesomeIcon
									icon={getSortIcon('name')}
									className='mr-1'
								/>
								Nombre
							</button>
							<button
								onClick={() => handleSort('price')}
								className={`button flex-1 text-xs py-2 ${
									sortBy === 'price'
										? 'bg-nutrisys-primary-200 text-black font-bold border border-nutrisys-primary-500'
										: 'bg-gray-200 text-gray-700'
								}`}
							>
								<FontAwesomeIcon
									icon={getSortIcon('price')}
									className='mr-1'
								/>
								Precio
							</button>
							<button
								onClick={() => handleSort('stock')}
								className={`button flex-1 text-xs py-2 ${
									sortBy === 'stock'
										? 'bg-nutrisys-primary-200 text-black font-bold border border-nutrisys-primary-500'
										: 'bg-gray-200 text-gray-700'
								}`}
							>
								<FontAwesomeIcon
									icon={getSortIcon('stock')}
									className='mr-1'
								/>
								Stock
							</button>
						</div>

						{/* Botón Agregar Producto */}
						<button
							onClick={handleCreateNew}
							className='button w-full bg-green-600 text-white py-2 mb-4 hover:bg-green-700'
						>
							<FontAwesomeIcon icon={faPlus} className='mr-2' />
							Agregar Producto
						</button>
					</div>

					{/* Lista de Productos */}
					<div className='flex-1 overflow-y-auto space-y-2'>
						{filteredProducts.map((product) => (
							<div
								key={product.id}
								className={`p-3 border rounded-lg cursor-pointer transition-colors font-montserrat ${
									selectedProduct?.id === product.id
										? 'border-nutrisys-primary-500 bg-nutrisys-primary-50'
										: 'border-nutrisys-background-200 bg-white hover:border-nutrisys-secondary-500'
								}`}
								onClick={() => handleProductSelect(product)}
							>
								<div className='flex justify-between items-start mb-2'>
									<h3 className='font-medium text-gray-800 text-sm'>
										{product.name}
									</h3>
									<span
										className={`text-xs px-2 py-1 rounded ${
											product.available
												? 'bg-green-100 text-green-800'
												: 'bg-red-100 text-red-800'
										}`}
									>
										{product.available
											? 'Disponible'
											: 'No disponible'}
									</span>
								</div>
								<p className='text-gray-600 text-xs mb-2 line-clamp-2'>
									{product.description}
								</p>
								<div className='flex justify-between items-center'>
									<span className='font-bold text-nutrisys-primary'>
										L. {product.price}
									</span>
									<span className='text-xs text-gray-500'>
										Stock: {product.stock}
									</span>
								</div>
							</div>
						))}
						{filteredProducts.length === 0 && (
							<div className='text-center text-gray-500 py-8'>
								No se encontraron productos
							</div>
						)}
					</div>
				</div>

				{/* Panel Derecho - Edición/Creación */}
				<div className='w-2/3 bg-white rounded-xl p-6 font-montserrat'>
					{selectedProduct || isCreating ? (
						<>
							<div className='flex justify-between items-center mb-6'>
								<h2 className='text-xl font-bold text-nutrisys-primary'>
									{isCreating
										? 'Agregar Nuevo Producto'
										: 'Editar Producto'}
								</h2>
								<button
									onClick={() => {
										setSelectedProduct(null);
										setIsCreating(false);
									}}
									className='button bg-gray-500 text-white px-4 py-2 hover:bg-gray-600'
								>
									<FontAwesomeIcon icon={faTimes} />
								</button>
							</div>

							<div className='space-y-6'>
								{/* Imagen del Producto */}
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Imagen del Producto
									</label>
									<div className='flex items-center space-x-4 flex-row'>
										<div className='w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50'>
											{editForm.image ? (
												<img
													src={editForm.image}
													alt='Preview'
													className='w-full h-full object-cover rounded-lg'
												/>
											) : (
												<FontAwesomeIcon
													icon={faImage}
													className='text-gray-400 text-2xl'
												/>
											)}
										</div>
										<input
											type='file'
											id='file-upload'
											accept='image/*'
											onChange={handleImageUpload}
											className='hidden'
										/>
										{/*Inout file personalizado*/}
										<label
											htmlFor='file-upload'
											className='button block w-fit text-sm text-gray-500'
										>
											Seleccionar archivo
										</label>

										{/* Nombre del archivo */}
										{editForm.image && (
											<span className='text-sm font-semibold text-gray-600 truncate w-half'>
												Archivo seleccionado:{' '}
												{editForm.image
													? `${editForm.image}`
													: 'No se ha seleccionado ningun archivo'}
											</span>
										)}
									</div>
								</div>

								{/* Nombre */}
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Nombre del Producto *
									</label>
									<input
										type='text'
										className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutrisys-primary'
										placeholder='Ingrese el nombre del producto'
										value={editForm.name}
										onChange={(e) =>
											setEditForm({
												...editForm,
												name: e.target.value,
											})
										}
									/>
								</div>

								{/* Descripción */}
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Descripción *
									</label>
									<textarea
										rows={4}
										className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutrisys-primary'
										placeholder='Describa el producto, beneficios, ingredientes, etc.'
										value={editForm.description}
										onChange={(e) =>
											setEditForm({
												...editForm,
												description: e.target.value,
											})
										}
									/>
								</div>

								{/* Precio y Stock */}
								<div className='grid grid-cols-2 gap-4'>
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											Precio (Lempiras) *
										</label>
										<input
											type='number'
											min='0'
											step='0.01'
											className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutrisys-primary'
											placeholder='0.00'
											value={editForm.price}
											onChange={(e) =>
												setEditForm({
													...editForm,
													price: e.target.value,
												})
											}
										/>
									</div>
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											Cantidad en Stock *
										</label>
										<input
											type='number'
											min='0'
											className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutrisys-primary'
											placeholder='0'
											value={editForm.stock}
											onChange={(e) =>
												setEditForm({
													...editForm,
													stock: e.target.value,
												})
											}
										/>
									</div>
								</div>

								{/* Disponibilidad */}
								<div className='flex items-center space-x-3'>
									<input
										type='checkbox'
										id='available'
										checked={editForm.available}
										onChange={(e) =>
											setEditForm({
												...editForm,
												available: e.target.checked,
											})
										}
										className='w-4 h-4 text-nutrisys-primary border-gray-300 rounded focus:ring-nutrisys-primary'
									/>
									<label
										htmlFor='available'
										className='text-sm font-medium text-gray-700'
									>
										Producto disponible para la venta
									</label>
								</div>

								{/* Botones de Acción */}
								<div className='flex justify-between pt-6'>
									<div>
										{!isCreating && (
											<button
												onClick={() =>
													handleDelete(
														selectedProduct
													)
												}
												className='button bg-red-600 text-white px-6 py-2 hover:bg-red-700'
											>
												<FontAwesomeIcon
													icon={faTrash}
													className='mr-2'
												/>
												Eliminar
											</button>
										)}
									</div>
									<button
										onClick={handleSave}
										className='button bg-nutrisys-primary text-white px-6 py-2 hover:bg-nutrisys-primary/90'
									>
										<FontAwesomeIcon
											icon={faSave}
											className='mr-2'
										/>
										{isCreating
											? 'Crear Producto'
											: 'Guardar Cambios'}
									</button>
								</div>
							</div>
						</>
					) : (
						<div className='flex flex-col items-center justify-center h-full text-gray-500 font-montserrat'>
							<FontAwesomeIcon
								icon={faEdit}
								className='text-6xl mb-4 text-nutrisys-secondary-500'
							/>
							<h3 className='text-xl font-bold mb-2 text-nutrisys-secondary-500'>
								Selecciona un producto para editar
							</h3>
							<p className='text-center font-semibold'>
								Elige un producto de la lista de la izquierda
								para editarlo, o haz clic en "Agregar Producto"
								para crear uno nuevo.
							</p>
						</div>
					)}
				</div>
			</div>

			{/* Modal de Confirmación de Eliminación */}
			{showDeleteModal && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<div className='bg-white rounded-xl p-6 max-w-md w-full mx-4'>
						<h3 className='text-lg font-bold text-gray-800 mb-4'>
							Confirmar Eliminación
						</h3>
						<p className='text-gray-600 mb-6'>
							¿Estás seguro de que deseas eliminar el producto "
							{productToDelete?.name}"? Esta acción no se puede
							deshacer.
						</p>
						<div className='flex justify-end space-x-4'>
							<button
								onClick={() => setShowDeleteModal(false)}
								className='button bg-gray-500 text-white px-4 py-2 hover:bg-gray-600'
							>
								Cancelar
							</button>
							<button
								onClick={confirmDelete}
								className='button bg-red-600 text-white px-4 py-2 hover:bg-red-700'
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
