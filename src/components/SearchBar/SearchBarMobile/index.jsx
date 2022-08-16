import SearchBar from "../";
import { ContainerMobile } from "./styles";

export default function SearchBarMobile() {
  return(
    <ContainerMobile>
      <SearchBar
        className="searchbar-mobile"
        placeholder="Search for people and friends"
      />
    </ContainerMobile>
  );
}