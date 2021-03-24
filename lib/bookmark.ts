import {
  BOOKMARK_DB_NAME,
  BOOKMARK_DB_VERSION,
  BOOKMARK_DB_RECIPE_LIST_NAME,
  BOOKMARK_RECIPE_AMOUNT_PER_PAGE,
} from "./constants";

let bookmarkDB: IDBDatabase;
let initialized = false;

export async function initializeBookmark(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const req = indexedDB.open(BOOKMARK_DB_NAME, BOOKMARK_DB_VERSION);
    req.onsuccess = (e: Event) => {
      bookmarkDB = (e.target as IDBOpenDBRequest).result;
      initialized = true;
      resolve();
    };
    req.onerror = (_) => reject(req.error);

    // バージョンが変更された or 初めて利用したときはデータベースを作成しなおす
    req.onupgradeneeded = (ev: Event) => {
      const req = ev.target as IDBOpenDBRequest;
      bookmarkDB = req.result;

      // 現在のバージョン（bookmarkDB.version）を見て更新処理みたいなのを書くことができる（が、今回はあったデータは全て削除する）
      if (bookmarkDB.objectStoreNames.contains(BOOKMARK_DB_RECIPE_LIST_NAME))
        bookmarkDB.deleteObjectStore(BOOKMARK_DB_RECIPE_LIST_NAME);

      bookmarkDB.createObjectStore(BOOKMARK_DB_RECIPE_LIST_NAME, {
        autoIncrement: true,
      });
    };
  });
}

/**
 * ブックマークに指定したレシピの ID を追加します。
 * @param id ブックマークに追加するレシピの ID
 */
export async function addBookmark(id: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (!initialized) reject("DB not initialized yet");
    const objStore = bookmarkDB
      .transaction(BOOKMARK_DB_RECIPE_LIST_NAME, "readonly")
      .objectStore(BOOKMARK_DB_RECIPE_LIST_NAME);

    const req = objStore.add(id);

    req.onsuccess = (_) => resolve();
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
    if (!initialized) reject("DB not initialized yet");
    const objStore = bookmarkDB
      .transaction(BOOKMARK_DB_RECIPE_LIST_NAME, "readonly")
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
    if (!initialized) reject("DB not initialized yet");
    const objStore = bookmarkDB
      .transaction(BOOKMARK_DB_RECIPE_LIST_NAME, "readonly")
      .objectStore(BOOKMARK_DB_RECIPE_LIST_NAME);

    const req = objStore.count(id);

    req.onsuccess = (_) => resolve(req.result === 1);
    req.onerror = (_) => reject(req.error);
  });
}

/**
 * 指定した ID のブックマーク内の存在を反転させます。
 * @param id ブックマーク内にいる場合は削除し、そうでない場合は追加するレシピの ID
 * @returns 新たにブックマークに追加された場合は true を、削除された場合は false
 */
export async function toggleBookmark(id: number): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    if (!initialized) reject("DB not initialized yet");
    if (isInBookmark(id)) {
      removeBookmark(id);
      return false;
    } else {
      addBookmark(id);
      return true;
    }
  });
}

/**
 * ブックマークに追加されているレシピの ID を返します。
 * @param page ページネーション可能な場合に指定できるページ番号
 * @returns ページに対応するブックマークに追加されたレシピ ID の配列
 */
export async function fetchBookmark(page?: number): Promise<number[]> {
  return new Promise<number[]>((resolve, reject) => {
    if (!initialized) reject("DB not initialized yet");
    const objStore = bookmarkDB
      .transaction(BOOKMARK_DB_RECIPE_LIST_NAME, "readonly")
      .objectStore(BOOKMARK_DB_RECIPE_LIST_NAME);

    // 要求されたページに含まれる最初のブックマーク対象にカーソルを合わせる
    const range = IDBKeyRange.lowerBound(
      page ? (page - 1) * BOOKMARK_RECIPE_AMOUNT_PER_PAGE : 0
    );
    const cur = objStore.openCursor(range);
    const recipeIDs: number[] = [];

    cur.onsuccess = (e) => {
      const cursor = (e.target as IDBRequest).result as IDBCursorWithValue;

      // 最後の要素まで読み取ったか1ページ内に含まれるブックマークを読み切ったら返す
      do {
        recipeIDs.push(cursor.value);
        cursor.continue();
      } while (
        cursor
        // && recipeIDs.length >= BOOKMARK_RECIPE_AMOUNT_PER_PAGE
      );
      resolve(recipeIDs);
    };
    cur.onerror = (_) => reject(cur.error);
  });
}
