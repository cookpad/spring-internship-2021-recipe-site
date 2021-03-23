// Request
// リクエストパラメータはなし。

// Response
export type APIResponse = {
  // 画像をアップロードするためのURL。このURLが利用できるのはリクエストしてから10分間。
  presigned_url: string;

  // 画像を参照するためのURL。presigned_url を使ってアップロード後に参照可能になる。
  // この値を `POST /recipes` の `imaeg_url` に指定する。
  object_url: string;
};
