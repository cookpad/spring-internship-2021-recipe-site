import { FC, useState } from 'react';

import { useRouter } from 'next/router';

const SearchBar: FC = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>(typeof router.query.keyword === 'undefined' ? '' : String(router.query.keyword));

  const onEnter = (): void => {
    if (value === null) return;
    router.push({
      pathname: '/recipes/search',
      query: {keyword: value}
    });
  };

  return(
    <input 
      type="text"
      value={value}
      onChange={(e): void => setValue(e.target.value)}
      placeholder='🔍レシピを検索'
      onKeyPress={e =>
        {if (e.key == 'Enter') {
          e.preventDefault();
          onEnter();
        }
      }}
    />
  );
}

export default SearchBar;
