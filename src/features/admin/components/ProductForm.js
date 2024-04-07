import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProduct,
  createProductsAsync,
  fetchProductByIdAsync,
  selectAllBrands,
  selectAllCategories,
  selectProductById,
  updateProductsAsync,
} from "../../product/productListSlice";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
const ProductForm = () => {
  const brands = useSelector(selectAllBrands);
  const category = useSelector(selectAllCategories);
  const selectedProduct = useSelector(selectProductById);
  const dispatch = useDispatch();
  const params = useParams();
  // console.log(selectedProduct);
  // console.log(params);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    params?.id
      ? dispatch(fetchProductByIdAsync(params.id))
      : dispatch(clearSelectedProduct());
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct && params?.id) {
      setValue("title", selectedProduct[0]?.title);
      setValue("brand", selectedProduct[0]?.brand);
      setValue("discountPercentage", selectedProduct[0]?.discountPercentage);
      setValue("price", selectedProduct[0]?.price);
      setValue("rating", selectedProduct[0]?.rating);
      setValue("stock", selectedProduct[0]?.stock);
      setValue("category", selectedProduct[0]?.category);
      setValue("description", selectedProduct[0]?.description);
      setValue("thumbnail", selectedProduct[0]?.thumbnail);
      setValue("image1", selectedProduct[0]?.images[0]);
      setValue("image2", selectedProduct[0]?.images[1]);
      setValue("image3", selectedProduct[0]?.images[2]);
    }
  }, [selectedProduct, params?.id, setValue]);

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          const newProduct = { ...data };
          newProduct.rating = 4;
          newProduct.images = [
            newProduct?.image1,
            newProduct?.image2,
            newProduct?.image3,
            newProduct?.thumbnail,
          ];
          delete newProduct.image1;
          delete newProduct.image2;
          delete newProduct.image3;
          //Todo: Data will be dispatch to an api where we add product.
          if (params?.id) {
            newProduct.id = params?.id;
            newProduct.rating = selectedProduct[0].rating || 0;
            dispatch(updateProductsAsync(newProduct));
          } else {
            dispatch(createProductsAsync(newProduct));
          }
          reset();
        })}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
              Product Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Note: This information will be displayed publicly so be careful
              what you share.
            </p>
            {/* Product Information */}
            <div className="mt-10 border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="title"
                      {...register("title", {
                        required: "Please enter your product name.",
                      })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.title && (
                    <span className=" font-medium text-sm text-red-400">
                      {errors.title.message}
                    </span>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Brand
                  </label>
                  <div className="mt-2">
                    <select
                      type="number"
                      id="brand"
                      {...register("brand", {
                        required: "Brand name is required",
                      })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value={null}>--Select brand--</option>
                      {brands?.map((brand, index) => (
                        <option key={brand?.value} value={brand?.value}>
                          {brand?.value}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.brand && (
                    <span className=" font-medium text-sm text-red-400">
                      {errors.brand.message}
                    </span>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <div className="mt-2">
                    <select
                      id="category"
                      {...register("category", {
                        required: "Please select the product category",
                      })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value={null}> --Select category--</option>
                      {category?.map((category, index) => (
                        <option key={category?.value} value={category?.value}>
                          {category?.value}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.category && (
                    <span className=" font-medium text-sm text-red-400">
                      {errors.category.message}
                    </span>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      id="price"
                      {...register("price", {
                        required: "Product price is required",
                        min: 1,
                      })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.price && (
                    <span className=" font-medium text-sm text-red-400">
                      {errors.price.message}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="discountPercentage"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Discount
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      id="discountPercentage"
                      {...register("discountPercentage", {
                        required: "Discount is required.",
                        min: 0,
                        max: 100,
                      })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.discountPercentage && (
                    <span className=" font-medium text-sm text-red-400">
                      {errors.discountPercentage.message}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Stock
                  </label>
                  <div className="mt-2">
                    <input
                      id="stock"
                      type="number"
                      {...register("stock", {
                        required: "Number of stock required",
                        min: 1,
                        max: 1000,
                      })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-in/set ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.stock && (
                    <span className=" font-medium text-sm text-red-400">
                      {errors.stock.message}
                    </span>
                  )}
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Thumbnail
                  </label>
                  <div className="mt-2">
                    <input
                      id="thumbnail"
                      type="text"
                      {...register("thumbnail", {
                        required: "Product image is required",
                      })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-in/set ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.thumbnail && (
                    <span className=" font-medium text-sm text-red-400">
                      {errors.thumbnail.message}
                    </span>
                  )}
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="image1"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image 1
                  </label>
                  <div className="mt-2">
                    <input
                      id="image1"
                      type="text"
                      {...register("image1", {
                        required: "Product image is required",
                      })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-in/set ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.image1 && (
                    <span className=" font-medium text-sm text-red-400">
                      {errors.image1.message}
                    </span>
                  )}
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="image2"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image 2
                  </label>
                  <div className="mt-2">
                    <input
                      id="image2"
                      type="text"
                      {...register("image2", {
                        required: "Product image is required",
                      })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-in/set ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.image2 && (
                    <span className=" font-medium text-sm text-red-400">
                      {errors.image2.message}
                    </span>
                  )}
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="image3"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image 3
                  </label>
                  <div className="mt-2">
                    <input
                      id="image3"
                      type="text"
                      {...register("image3", {
                        required: "Product image is required",
                      })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-in/set ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.image3 && (
                    <span className=" font-medium text-sm text-red-400">
                      {errors.image3.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {/* Description Section */}
            <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "Description is required",
                    })}
                    rows="3"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about product.
                </p>
              </div>
            </div>
          </div>

          {/* Notification section */}
          {/* <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Notifications
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              We'll always let you know about important changes, but you pick
              what else you want to hear about.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="comments" className="font-medium text-gray-900">
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="candidates" className="font-medium text-gray-900">
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="offers" className="font-medium text-gray-900">
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div> */}
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            // onClick={(e) => e.preventDefault()}
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductForm;