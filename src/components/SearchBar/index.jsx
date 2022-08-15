import axios from 'axios';
import { useEffect, useState } from 'react';
import {DebounceInput} from 'react-debounce-input';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../../utils/apiUtils';
import { InputBar, SearchContainer, SearchResult, SearchResultsPanel } from './styles';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();

  const filteredSearch = search.length >= 3 ? 
    usersData.filter(user => {
      return user.username.toLowerCase().includes(search.toLowerCase());
    }) 
  : [];

  console.log("filteredSearch no início")
  console.log(filteredSearch)

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

  console.log("usersData")
  console.log(usersData)

  function goToUserPage(id) {
    navigate(`/user/${id}`)
  }

  function renderResults() {
    console.log("filteredSearch");
    console.log(filteredSearch);
    if (search.length >= 3) {
      return(
        filteredSearch.length > 0?
        <SearchResultsPanel>
          {filteredSearch.map((user, index) => {
              return(
                <SearchResult key={index} onClick={() => goToUserPage(user.id)}>
                  <img src={user.picture} alt="profile image" />
                  {user.username}
                </SearchResult>
              )
            })
          }
        </SearchResultsPanel> 
        : 
        <SearchResultsPanel>
          <SearchResult>
            Nenhum usuário encontrado
          </SearchResult>
        </SearchResultsPanel>
      ); 
    }
    return
  }

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
      {usersData ? 
          renderResults()
        : 
          ''
      }
    </SearchContainer>
  );
}