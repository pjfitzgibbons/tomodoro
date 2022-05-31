import { defineStore } from "pinia";
import type { Category } from "@/stores/db";
import { db } from "@/stores/dbDexie";
import { uid } from "@/utils/customUtils";
import { chain, sortBy } from 'lodash';
import * as _ from 'lodash';

interface CategoryStoreProps {
  categories: { [key:string]: Category };
}

export const useCategoryStore = defineStore("CategoryStore", {
  state: (): CategoryStoreProps => {
    return {
      categories: {},
    };
  },
  actions: {
    newCategory(name: string): Category {
      return {
        _id: uid(),
        name
      };
    },
    async fetchCategories() {
      this.categories = chain(await db.categories.toArray())
      .keyBy("_id")
      .value();
    },

    async save(category: Category): Promise<Category> {
      // unwrap proxy object category - it might be a Proxy of Category due to
      // vue reactivity object
      await db.categories.put({ ...category });
      this.categories[category._id] = category;
      return category;
    },
  },
  getters: {
    sorted(): Category[] {
      return sortBy(this.categories, 'name')
    }
  }
});
export { _ }