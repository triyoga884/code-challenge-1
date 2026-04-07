import { useLocation, useNavigate } from 'react-router';
import data from './assets/data.json';
import { useEffect, useState } from 'react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<string>('');
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
    }
    if (subCategoryFromUrl) {
      setSelectedSubCategory(subCategoryFromUrl);
    }
    if (brandFromUrl) {
      setSelectedBrand(brandFromUrl);
    }
    if (productsFromUrl) {
      setSelectedProducts(productsFromUrl);
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
    const params = new URLSearchParams(location.search);
    setSelectedCategory('');
    setSelectedSubCategory('');
    setSelectedBrand('');
    setSelectedProducts('');
    params.delete('category');
    params.delete('subCategory');
    params.delete('brand');
    params.delete('products');
  };

  return (
    <div className="App min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6">
        <div className="combobox grid grid-cols-1 md:grid-cols-4 gap-6">
          <section className="main flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Main Category
            </label>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              name="main-categories"
              id="main"
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

          <section className="sub flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Sub Category
            </label>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={selectedCategory === ''}
              name="sub-categories"
              id="sub"
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

          <section className="brands flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Brands
            </label>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={selectedSubCategory === ''}
              name="brands"
              id="brands"
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

          <section className="products flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Products
            </label>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={selectedBrand === ''}
              name="products"
              id="products"
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

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleReset}
            className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
