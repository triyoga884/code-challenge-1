import { useLocation, useNavigate } from "react-router";
import data from "./assets/data.json";
import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const category = params.get("category");
  const subCategory = params.get("subCategory");
  const brand = params.get("brand");

  type FilterLevel = "category" | "subCategory" | "brand";

  const [filteredProduct, setFilteredProducts] = useState<any[]>(data.products);

  useEffect(() => {
    let listProducts = data.products;
    if (brand) {
      listProducts = data.products.filter((item) => item.brandId === brand);
    } else if (subCategory) {
      const filteredBrand = data.brands.filter(
        (item) => item.subCategoryId === subCategory,
      );
      listProducts = data.products.filter((item) =>
        filteredBrand.some((brand) => brand.id === item.brandId),
      );
    } else if (category) {
      const filteredSubCategory = data.subCategories.filter(
        (item) => item.categoryId === category,
      );
      const filteredBrand = data.brands.filter((item) =>
        filteredSubCategory.some((sub) => sub.id === item.subCategoryId),
      );
      listProducts = data.products.filter((item) =>
        filteredBrand.some((sub) => sub.id === item.brandId),
      );
    }
    setFilteredProducts(listProducts);
  }, [category, subCategory, brand, data]);

  const handleChange = (level: FilterLevel, value: string) => {
    const params = new URLSearchParams(location.search);
    switch (level) {
      case "category":
        params.delete("subCategory");
        params.delete("brand");
        params.delete("products");
        break;
      case "subCategory":
        params.delete("brand");
        params.delete("products");
        break;
      case "brand":
        params.delete("products");
        break;
      default:
        break;
    }
    params.set(level, value);
    navigate({ search: params.toString() });
  };

  const handleReset = () => {
    navigate({ search: "" });
  };

  return (
    <div className="App min-h-screen bg-linear-to-br from-gray-50 to-gray-200 flex flex-col items-center p-6 gap-8">
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
              value={category || ""}
              onChange={(e) => handleChange("category", e.target.value)}
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
              disabled={!category}
              value={subCategory || ""}
              onChange={(e) => handleChange("subCategory", e.target.value)}
            >
              <option value="" disabled>
                Select a sub category
              </option>
              {data.subCategories
                .filter((item) => item.categoryId === category)
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
              disabled={!subCategory}
              value={brand || ""}
              onChange={(e) => handleChange("brand", e.target.value)}
            >
              <option value="" disabled>
                Select a brand
              </option>
              {data.brands
                .filter((item) => item.subCategoryId === subCategory)
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
          {filteredProduct.map((item) => (
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
