import { FC } from "react";

type Props = {
  searchQuery?: string;
};

const Header: FC<Props> = (props) => {
  const SEARCH_BAR_INPUT_ID = "search-bar-input";

  const onSearchSubmitted = (e) => {
    // エンターが押下されたとき検索を開始
    if (e.which == 13) onSearchTriggered();
  };

  const onSearchTriggered = () => {
    const elem = document.getElementById(SEARCH_BAR_INPUT_ID);
    const keyword = elem.value;

    // 検索窓に何かが入力されていた場合、検索を開始
    if (keyword) location.href = `/search?keyword=${keyword}`;
  };

  return (
    <header>
      <div className="p-4 bg-gray-300">
        <a href="/">
          <p className="text-lg text-center">料理板</p>
        </a>
      </div>

      <div className="p-4 bg-gray-100 w-full flex justify-content">
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
