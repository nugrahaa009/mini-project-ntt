import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../utils/AxiosBaseQuery";
import type {
  ProductItem,
  ProductsResponse,
  ProductPayload,
} from "../../types/product";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductsResponse,
      {
        search?: string;
        limit?: number;
        skip?: number;
        sortBy?: string;
        order?: string;
      }
    >({
      query: ({ search = "", limit = 10, skip = 0, sortBy, order }) => ({
        url: search ? "/products/search" : "/products",
        method: "GET",
        params: {
          ...(search && { q: search }),
          limit,
          skip,
          sortBy,
          order,
        },
      }),
      providesTags: ["Products"],
    }),

    getProduct: builder.query<ProductItem, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),

    addProduct: builder.mutation<ProductItem, ProductPayload>({
      query: (body) => ({
        url: "/products/add",
        method: "POST",
        data: body,
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data: newProduct } = await queryFulfilled;

          dispatch(
            productApi.util.updateQueryData(
              "getProducts",
              { search: "", limit: 10, skip: 0 }, // ⚠️ harus match params
              (draft) => {
                draft.products.unshift({
                  ...newProduct,
                  id: Date.now(), // fake ID biar unik
                });
              },
            ),
          );
        } catch {
          // ignore
        }
      },

      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation<
      ProductItem,
      { id: number } & ProductPayload
    >({
      query: ({ id, ...body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation<{ isDeleted: boolean }, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
