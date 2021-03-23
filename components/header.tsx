import { FC } from "react";

type Props = {
  searchQuery?: string;
};

const Header: FC<Props> = (props) => {
  const onKeyPress = (e) => {
    // 検索窓に何かが入力されていて、かつエンターが押下されたとき検索を開始
    if (e.which == 13) {
      const keyword = e.target.value;
      if (keyword) location.href = `/search?keyword=${keyword}`;
    }
  };

  return (
    <header>
      <div className="p-4 bg-gray-300">
        <a href="/">
          <p className="text-lg text-center">料理板</p>
        </a>
      </div>

      <div className="p-4 bg-gray-100">
        <input
          type="search"
          name="search"
          defaultValue={props.searchQuery}
          placeholder="検索"
          className="border-2 border-gray-300 bg-white h-10 w-full px-5  object-center rounded-lg text-sm focus:outline-none"
          onKeyPress={onKeyPress}
        />
      </div>
    </header>
  );
};

export default Header;
