import { axios } from "../utils";
import { useCategoryStore } from "../stores/category";

async function get() {
  const categoryStore = useCategoryStore();

  return axios.get("/categories").then((response) => {
    categoryStore.setCategoryList(response.data.data);

    return response;
  });
}

export default { get };
