import styled from "styled-components";
import { ShowDetails, MovieDetails } from "../utils/models/details";
import getCountryName from "../utils/translations/countries";
import getLanguageName from "../utils/translations/languages";

const Column = styled.div`
  box-sizing: border-box;
  float: left;
  width: auto;
  margin-right: 10px;
`;

const ColumnKey = styled.p`
  color: #00c2cb;
  font-weight: 800;
  padding: 10px;
  padding-left: 0px;
`;

const ColumnValue = styled.p`
  color: #e7e7e7;
  padding: 10px;
`;

interface CreditsProps {
  asset: ShowDetails | MovieDetails;
}

function Credits({
    asset
} : CreditsProps) {
    const {
        production_companies: companies,
        production_countries: prodCountries,
        spoken_languages: spokenLanguages
    } = asset;
    const countries = prodCountries.map((country) => getCountryName(country));
    const languages = spokenLanguages.map((language) => getLanguageName(language));

    return (<>
        <Column>
            {companies.length > 0 && <ColumnKey>Producido por</ColumnKey>}
            {countries.length > 0 && <ColumnKey>Países</ColumnKey>}
            {languages.length > 0 && <ColumnKey>Linguas faladas</ColumnKey>}
        </Column>
        <Column>
            {companies.length > 0 && <ColumnValue>{companies.map((company) => company.name).join(", ")}</ColumnValue>}
            {countries.length > 0 && <ColumnValue>{countries.join(", ")}</ColumnValue>}
            {languages.length > 0 && <ColumnValue>{languages.join(", ")}</ColumnValue>}
        </Column>
    </>)
}

export default Credits;
