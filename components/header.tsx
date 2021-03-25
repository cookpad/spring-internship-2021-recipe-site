import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { FC } from "react";

type Props = {
  searchQuery?: string;
};

const Header: FC<Props> = (props) => {
  const SEARCH_BAR_INPUT_ID = "search-bar-input";
  const router = useRouter();

  const onSearchSubmitted = (e) => {
    // エンターが押下されたとき検索を開始
    if (e.which == 13) onSearchTriggered();
  };

  const onSearchTriggered = () => {
    const elem = document.getElementById(
      SEARCH_BAR_INPUT_ID
    ) as HTMLInputElement;
    const keyword = elem.value;

    // 検索窓に何かが入力されていた場合、検索を開始
    if (keyword) router.push(`/search?keyword=${keyword}`);
  };

  return (
    <header>
      <Link href="/">
        <div className="p-4 bg-gray-300">
          <p className="text-lg text-center">料理板</p>
        </div>
      </Link>

      <div className="px-2 py-4 bg-gray-100 w-full flex justify-content">
        <Link href="/bookmark">
          <span className="px-2 mr-2 text-3xl">🔖</span>
        </Link>
        <input
          type="search"
          name="search"
          defaultValue={props.searchQuery}
          placeholder="検索"
          className="border-2 border-gray-300 bg-white h-10 pl-5 w-full object-center rounded-lg text-sm focus:outline-none"
          id={SEARCH_BAR_INPUT_ID}
          onKeyPress={onSearchSubmitted}
        />
        <button className="px-2 text-3xl" onClick={onSearchTriggered}>
          🔎
        </button>
      </div>
    </header>
  );
};

export default Header;
