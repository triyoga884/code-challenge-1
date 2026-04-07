import { useLocation, useNavigate } from 'react-router';
import data from './assets/data.json';
import { useEffect, useState } from 'react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<string>('');
  const [products, setProducts] = useState<any[]>(data.products);
  const navigate = useNavigate();
  const location = useLocation();
  const categoryFromUrl = new URLSearchParams(location.search).get('category');
  const subCategoryFromUrl = new URLSearchParams(location.search).get(
    'subCategory',
  );
  const brandFromUrl = new URLSearchParams(location.search).get('brand');
  const productsFromUrl = new URLSearchParams(location.search).get('products');

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
      const filteredSubCategories = data.subCategories.filter(
        (item) => item.categoryId === categoryFromUrl,
      );
      const filteredBrands = data.brands.filter((item) =>
        filteredSubCategories.some((sub) => sub.id === item.subCategoryId),
      );
      const filteredProducts = data.products.filter((item) =>
        filteredBrands.some((brand) => brand.id === item.brandId),
      );
      setProducts(filteredProducts);
    }
    if (subCategoryFromUrl) {
      setSelectedSubCategory(subCategoryFromUrl);
      const filteredBrands = data.brands.filter(
        (item) => item.subCategoryId === subCategoryFromUrl,
      );
      const filteredProducts = data.products.filter((item) =>
        filteredBrands.some((brand) => brand.id === item.brandId),
      );
      setProducts(filteredProducts);
    }
    if (brandFromUrl) {
      setSelectedBrand(brandFromUrl);
      const filteredProducts = data.products.filter(
        (item) => item.brandId === brandFromUrl,
      );
      setProducts(filteredProducts);
    }
    if (productsFromUrl) {
      setSelectedProducts(productsFromUrl);
      setProducts(
        data.products.filter((item) => item.brandId === brandFromUrl),
      );
    }
  }, [categoryFromUrl, subCategoryFromUrl, brandFromUrl, productsFromUrl]);

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    const params = new URLSearchParams(location.search);
    setSelectedSubCategory('');
    setSelectedBrand('');
    setSelectedProducts('');
    params.delete('subCategory');
    params.delete('brand');
    params.delete('products');
    params.set('category', value);
    navigate({ search: params.toString() });
  };

  const handleChangeSubCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedSubCategory(value);
    const params = new URLSearchParams(location.search);
    setSelectedBrand('');
    setSelectedProducts('');
    params.delete('brand');
    params.delete('products');
    params.set('subCategory', value);
    navigate({ search: params.toString() });
  };

  const handleChangeBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedBrand(value);
    const params = new URLSearchParams(location.search);
    setSelectedProducts('');
    params.delete('products');
    params.set('brand', value);
    navigate({ search: params.toString() });
  };

  const handleChangeProducts = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedProducts(value);
    const params = new URLSearchParams(location.search);
    params.set('products', value);
    navigate({ search: params.toString() });
  };

  const handleReset = () => {
    setSelectedCategory('');
    setSelectedSubCategory('');
    setSelectedBrand('');
    setSelectedProducts('');
    setProducts(data.products);
    const params = new URLSearchParams(location.search);
    params.delete('category');
    params.delete('subCategory');
    params.delete('brand');
    params.delete('products');
    navigate({ search: params.toString() });
  };

  return (
    <div className="App min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center p-6 gap-8">
      {/* FILTER CARD */}
      <div className="w-full max-w-6xl bg-white/90 backdrop-blur shadow-xl rounded-3xl p-8 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Filter Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <section className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Main Category
            </label>
            <select
              className="bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={selectedCategory}
              onChange={handleChangeCategory}
            >
              <option value="" disabled>
                Select a category
              </option>
              {data.categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </section>

          <section className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Sub Category
            </label>
            <select
              className="bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm shadow-sm disabled:bg-gray-100 disabled:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              disabled={selectedCategory === ''}
              value={selectedSubCategory}
              onChange={handleChangeSubCategory}
            >
              <option value="" disabled>
                Select a sub category
              </option>
              {data.subCategories
                .filter((item) => item.categoryId === selectedCategory)
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </section>

          <section className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Brand
            </label>
            <select
              className="bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm shadow-sm disabled:bg-gray-100 disabled:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              disabled={selectedSubCategory === ''}
              value={selectedBrand}
              onChange={handleChangeBrand}
            >
              <option value="" disabled>
                Select a brand
              </option>
              {data.brands
                .filter((item) => item.subCategoryId === selectedSubCategory)
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </section>

          <section className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Product
            </label>
            <select
              className="bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm shadow-sm disabled:bg-gray-100 disabled:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              disabled={selectedBrand === ''}
              value={selectedProducts}
              onChange={handleChangeProducts}
            >
              <option value="" disabled>
                Select a product
              </option>
              {data.products
                .filter((item) => item.brandId === selectedBrand)
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </section>
        </div>

        <div className="mt-8 flex justify-end items-center">
          <button
            onClick={handleReset}
            className="px-6 py-2.5 bg-linear-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-xl shadow hover:shadow-md hover:scale-[1.02] active:scale-95 transition"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* PRODUCT LIST */}
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="h-32 bg-gray-100 rounded-xl mb-3 flex items-center justify-center text-gray-400 text-sm">
                Image
              </div>

              <p className="text-sm font-semibold text-gray-800">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
