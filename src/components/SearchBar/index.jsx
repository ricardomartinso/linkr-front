import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { useNavigate } from "react-router-dom";
import { getApiUrl, getConfig } from "../../utils/apiUtils";
import {
  InputBar,
  SearchContainer,
  SearchResult,
  SearchResultsPanel,
} from "./styles";
import UserContext from "../../contexts/UserContext";

export default function SearchBar({ className, placeholder }) {
  const { token } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const config = getConfig(token);
    if (search.length >= 3) {
      const API_URL = getApiUrl(`users/${search}`);
      const promise = axios.get(API_URL, config);
      promise.then((res) => {
        setUsersData(res.data);
      });
      promise.catch((error) => {
        console.log(error);
      });
    }
  }, [search]);

  function goToUserPage(id) {
    navigate(`/user/${id}`);
  }

  function renderResults() {
    console.log(usersData);
    if (usersData.length) {
      return (
        <SearchResultsPanel>
          {usersData.map((user) => {
            return (
              <SearchResult key={user.id} onClick={() => goToUserPage(user.id)}>
                <img src={user.picture} alt="profile image" />
                {user.username}
              </SearchResult>
            );
          })}
        </SearchResultsPanel>
      );
    } else {
      return (
        <SearchResultsPanel>
          <SearchResult style={{ justifyContent: "center" }}>
            Nenhum usuário encontrado
          </SearchResult>
        </SearchResultsPanel>
      );
    }
  }

  return (
    <SearchContainer className={className}>
      <DebounceInput
        type={"search"}
        placeholder={placeholder}
        minLength={3}
        debounceTimeout={300}
        autoComplete="false"
        element={InputBar}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search.length >= 3 ? renderResults() : null}
    </SearchContainer>
  );
}
