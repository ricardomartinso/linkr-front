import axios from 'axios';
import { useEffect, useState } from 'react';
import {DebounceInput} from 'react-debounce-input';
import { getApiUrl } from '../../utils/apiUtils';
import { InputBar, SearchContainer } from './styles';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const [usersData, setUsersData] = useState([]);

  const filteredSearch = search.length >= 3 ? 
    usersData.filter(user => {
      user.username.toLowerCase().includes(search.toLowerCase());
    }) 
  : [];
  

  useEffect(() => {
    const API_URL = getApiUrl("users");
    const promise = axios.get(API_URL);
    promise.then((res) => {
      setUsersData(res.data);
    });
    promise.catch((error) => {
      console.log(error);
    });
  }, []);

  return(
    <SearchContainer>
      <DebounceInput
        type={'search'} 
        placeholder="Search for People"
        minLength={3}
        debounceTimeout={300}
        element={InputBar}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </SearchContainer>
  );
}