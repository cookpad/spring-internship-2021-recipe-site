import {
  BOOKMARK_DB_NAME,
  BOOKMARK_DB_VERSION,
  BOOKMARK_DB_RECIPE_LIST_NAME,
  BOOKMARK_RECIPE_AMOUNT_PER_PAGE,
} from "../constants";
import { Recipe } from "../recipe";

let bookmarkDB: IDBDatabase;

export async function initializeBookmark(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const req = indexedDB.open(BOOKMARK_DB_NAME, BOOKMARK_DB_VERSION);

    // バージョンが変更された or 初めて利用したときはデータベースを作成しなおす
    req.onupgradeneeded = (e: IDBVersionChangeEvent) => {
      bookmarkDB = (e.target as IDBOpenDBRequest).result;
      console.log(e);

      // 現在のバージョン（bookmarkDB.version）を見て更新処理みたいなのを書くことができる（が、今回はあったデータは全て削除する）
      if (bookmarkDB.objectStoreNames.contains(BOOKMARK_DB_RECIPE_LIST_NAME))
        bookmarkDB.deleteObjectStore(BOOKMARK_DB_RECIPE_LIST_NAME);

      bookmarkDB.createObjectStore(BOOKMARK_DB_RECIPE_LIST_NAME, {
        autoIncrement: false,
        keyPath: "id",
      } as IDBObjectStoreParameters);
    };

    // （onupgradeneeded が呼ばれたなら、それが終了した後）データベースを開くことに成功したら resolve
    req.onsuccess = (e: Event) => {
      bookmarkDB = (e.target as IDBOpenDBRequest).result;
      resolve();
    };
    req.onerror = (_) => reject(req.error);
  });
}

/**
 * ブックマークに指定したレシピの ID を追加します。
 * @param recipe ブックマークに追加するレシピ
 */
export async function addBookmark(recipe: Recipe): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (!bookmarkDB) reject("DB not initialized yet");
    const objStore = bookmarkDB
      .transaction(BOOKMARK_DB_RECIPE_LIST_NAME, "readwrite")
      .objectStore(BOOKMARK_DB_RECIPE_LIST_NAME);

    const req = objStore.put(recipe);

    req.onsuccess = (_) => {
      console.log(req.result);
      resolve();
    };
    req.onerror = (_) => reject(req.error);
  });
}

/**
 * ブックマークから指定された ID に対応するレシピを削除します
 * @param id 削除するレシピの ID
 * @returns レシピが削除された場合は true, レシピが存在しなかった場合は false
 */
export async function removeBookmark(id: number): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    if (!bookmarkDB) reject("DB not initialized yet");
    const objStore = bookmarkDB
      .transaction(BOOKMARK_DB_RECIPE_LIST_NAME, "readwrite")
      .objectStore(BOOKMARK_DB_RECIPE_LIST_NAME);

    const req = objStore.delete(id);

    req.onsuccess = (_) => resolve(true);
    req.onerror = (_) => reject(req.error);
  });
}

/**
 * ブックマークに指定したレシピの ID が存在するか判定します。
 * @param id ブックマーク内に存在するか確認するレシピの ID
 */
export async function isInBookmark(id: number): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    if (!bookmarkDB) reject("DB not initialized yet");
    const objStore = bookmarkDB
      .transaction(BOOKMARK_DB_RECIPE_LIST_NAME, "readonly")
      .objectStore(BOOKMARK_DB_RECIPE_LIST_NAME);

    const req = objStore.count(id);

    req.onsuccess = (_) => {
      resolve(req.result >= 1);
    };
    req.onerror = (_) => reject(req.error);
  });
}

/**
 * ブックマークに追加されているレシピの ID を返します。
 * @param page ページネーション可能な場合に指定できるページ番号
 * @returns ページに対応するブックマークに追加されたレシピ ID の配列
 */
export async function fetchBookmark(page: number = 1): Promise<Recipe[]> {
  return new Promise<Recipe[]>((resolve, reject) => {
    if (!bookmarkDB) reject("DB not initialized yet");
    const objStore = bookmarkDB
      .transaction(BOOKMARK_DB_RECIPE_LIST_NAME, "readonly")
      .objectStore(BOOKMARK_DB_RECIPE_LIST_NAME);

    // 要求されたページに含まれる最初のブックマーク対象にカーソルを合わせる
    const range = IDBKeyRange.lowerBound(
      (page - 1) * BOOKMARK_RECIPE_AMOUNT_PER_PAGE
    );
    const cur = objStore.openCursor(range);
    const recipes: Recipe[] = [];

    cur.onsuccess = (e) => {
      const cursor = (e.target as IDBRequest).result as IDBCursorWithValue;

      // 最後の要素まで読み取ったか1ページ内に含まれるブックマークを読み切ったら返す
      if (cursor && recipes.length < BOOKMARK_RECIPE_AMOUNT_PER_PAGE) {
        recipes.push(cursor.value);
        console.log(cursor);
        cursor.continue();
      }

      resolve(recipes);
    };
    cur.onerror = (_) => reject(cur.error);
  });
}

/**
 * ブックマークを全て削除します。
 */
export async function clearBookmark(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (!bookmarkDB) reject("DB not initialized yet");
    const objStore = bookmarkDB
      .transaction(BOOKMARK_DB_RECIPE_LIST_NAME, "readwrite")
      .objectStore(BOOKMARK_DB_RECIPE_LIST_NAME);

    const req = objStore.clear();

    req.onsuccess = (_) => resolve();
    req.onerror = (_) => reject(req.error);
  });
}

/**
 * 指定した ID のブックマーク内の存在を反転させます。
 * @param recipe ブックマーク内にいる場合は削除し、そうでない場合は追加するレシピ
 * @returns 新たにブックマークに追加された場合は true を、削除された場合は false
 */
export async function toggleBookmark(recipe: Recipe): Promise<boolean> {
  return new Promise<boolean>(async (resolve, reject) => {
    if (!bookmarkDB) reject("DB not initialized yet");
    if (await isInBookmark(recipe.id)) {
      removeBookmark(recipe.id);
      resolve(false);
    } else {
      addBookmark(recipe);
      resolve(true);
    }
  });
}
