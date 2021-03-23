import { FC } from "react";

const Header: FC = (props) => {
  const onKeyPress = (e) => {
    // エンターが押下されたとき検索
    if (e.which == 13) {
      // WIP
    }
  };

  return (
    <header>
      <div className="p-4 bg-gray-300">
        <a href="/">
          <p className="text-lg text-center">タイトル</p>
        </a>
      </div>

      <div className="p-4 bg-gray-100">
        <input
          type="search"
          name="search"
          placeholder="検索"
          className="border-2 border-gray-300 bg-white h-10 w-full px-5  object-center rounded-lg text-sm focus:outline-none"
          onKeyPress={onKeyPress}
        />
      </div>
    </header>
  );
};

export default Header;
