import { FocusableComponentLayout, FocusDetails } from "@noriginmedia/norigin-spatial-navigation";
import React, {useCallback} from "react";
import { useNavigate } from "react-router-dom";
import styled, {css} from "styled-components";
import { ASSET_TYPES, BANNER_TYPES, IMAGE_BASE_URL } from "../constants";
import { Movie, Show, getAssetDetails, isTypeShow } from "../utils/models/asset";
import getGenreName from "../utils/translations/genres";
import tmdbIcon from "../assets/tmdb_logo.svg";
import Button from "./Button";
import { hexToRgba } from "../utils/colors";

interface HeaderProps {
  imageUrl: string;
}

const Header = styled.header<HeaderProps>`
  height: auto;
  background-size: cover;
  background-position: center center;
  background-image: ${({imageUrl}) => `url(${imageUrl})`}
`;

const Contents = styled.div`
  background: linear-gradient(
    -90deg,
    transparent,
    ${({theme}) => hexToRgba(theme.colors.body, 0.01)},
    ${({theme}) => theme.colors.body}
  ) top,
  linear-gradient(
      180deg,
      transparent,
      ${({theme}) => hexToRgba(theme.colors.body, 0.01)},
      ${({theme}) => theme.colors.body}
  ) bottom;
  padding-left: 40px;
  padding-top: 130px;
  padding-bottom: 40px;
`;

const Title = styled.span`
  padding-top: 80px;
  text-align: left;
  font-size: 25px;
  font-weight: 800;
`;

const TitleWrapper = styled.div`
  display: inline;
`;

const LabelRow = styled.p`
  margin-top: 20px;
  align-items: center;
  display: inline-flex;
`
interface LabelProps {
  isLast: boolean
}
const Label = styled.span<LabelProps>`
  margin-right: 15px;
  &:after {
    ${({isLast}) => !isLast && css`
    content: "\\2022";
    margin-left: 15px;
    color: ${({theme}) => theme.colors.accent};
  `}
  }
`
interface OverviewProps {
  truncated: boolean
}

const Overview = styled.p<OverviewProps>`
  ${({truncated}) => !truncated && css`
    width: 800px;
  }`}
  ${({truncated}) => truncated && css`
    width: 600px;
  }`}
  margin-top: 20px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const TmdbIcon = styled.img`
  width: 30px;
  height: 40px;
  margin-left: -5px;
`;

const LABELS = {
    YEAR: "year",
    RUNTIME: "runtime",
    VOTE: "vote",
    GENRES: "genres",
    SEASONS: "seasons",
    EPISODES: "episodes"
}

interface BannerProps {
  asset: Show | Movie;
  type: string;
  watchLink?: string;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

function Banner({
    asset,
    type,
    onFocus,
    watchLink
}: BannerProps) {
    const navigate = useNavigate();

    const isHeroBanner = type === BANNER_TYPES.HERO;
    const assetType = isTypeShow(asset) ? ASSET_TYPES.SHOW : ASSET_TYPES.MOVIE;

    const details = getAssetDetails(asset);
    const {
        year,
        runtime,
        genres: fullGenres,
        vote_average: vote,
        title: assetName,
        seasons,
        episodes
    } = details;

    const genres = fullGenres ? fullGenres.map((genre) => getGenreName(genre, assetType)) : [];
    const hasRuntime = runtime !== undefined && Number.isFinite(runtime) && runtime !== 0;
    const hasGenres = genres !== undefined && genres.length > 0;
    const hasYear = year !== undefined && Number.isFinite(year);
    const hasVote = vote !== undefined && Number.isFinite(vote) && vote !== 0 ;
    const hasEpisodesInfo = assetType === ASSET_TYPES.SHOW && episodes !== undefined && Number.isFinite(episodes) && seasons !== undefined && Number.isFinite(seasons);

    const isLastLabel = (key: string) => {
        switch (key) {
        case LABELS.RUNTIME:
            return !hasGenres && !hasYear && !hasVote && !hasEpisodesInfo;
        case LABELS.GENRES:
            return !hasYear && !hasVote && !hasEpisodesInfo;
        case LABELS.YEAR:
            return !hasVote && !hasEpisodesInfo;
        case LABELS.SEASONS:
            return !hasVote;
        default:
            return true;
        }
    }

    function truncate(string: string, numberChars: number) : string{
        const truncated = isHeroBanner && string?.length > numberChars ? `${string.substr(0, numberChars - 1) }...` : string

        return truncated ? truncated.replace(/,?\s\.\.\.$/,"...") : truncated
    }

    const onPressDetails = useCallback(
        () => {
            navigate(`/details/${asset.id}?type=${assetType}`);
        },
        [asset, navigate, assetType]
    );

    const onPressWatch = useCallback(
        () => {
            window.open(`${watchLink}&language=gl-ES`, "_blank").focus();
        },
        [watchLink]
    );

    const toHoursAndMinutes = (totalMinutes: number) => {
        const minutes = totalMinutes % 60;
        const hours = Math.floor(totalMinutes / 60);
        let result;
        if (hours > 0){
            if (minutes > 0){
                result = `${hours}h ${minutes} min`;
            } else {
                result = `${hours}h`;
            }
        } else {
            result = `${minutes} min`;
        }
        return result;
    }

    return (
        <Header
            imageUrl={`${IMAGE_BASE_URL}/${details.backdrop_path}`}
        >
            <Contents>
                <TitleWrapper>
                    <Title>{assetName}</Title>
                </TitleWrapper>
                <ButtonContainer>
                    {!isHeroBanner && watchLink && <Button
                        text="Reproducir"
                        onFocus={onFocus}
                        onEnterPress={onPressWatch}
                        onClickHandler={onPressWatch}
                    />
                    }
                    {isHeroBanner && <Button
                        text="Máis información"
                        onFocus={onFocus}
                        onEnterPress={onPressDetails}
                        onClickHandler={onPressDetails}
                    />
                    }
                </ButtonContainer>
                {!isHeroBanner && <LabelRow data-testid="label-row">
                    {hasRuntime && <Label isLast={isLastLabel(LABELS.RUNTIME)}>{toHoursAndMinutes(runtime)}</Label>}
                    {hasGenres && <Label isLast={isLastLabel(LABELS.GENRES)}>{genres.join(", ")}</Label>}
                    {hasYear && <Label isLast={isLastLabel(LABELS.YEAR)}>{year.toString()}</Label>}
                    {hasEpisodesInfo && <Label isLast={isLastLabel(LABELS.SEASONS)}> {`${seasons} tempada${seasons > 1 ? "s" : ""} / ${episodes} episodio${episodes > 1 ? "s" : ""}`} </Label>}
                    {hasVote && <><Label isLast={isLastLabel(LABELS.VOTE)}>
                        {Math.round(vote * 10) / 10} / 10
                    </Label>
                    <TmdbIcon
                        alt="tmdb"
                        title="Valoración en The Movie Database"
                        src={tmdbIcon}
                    />
                    </>}
                </LabelRow>}
                {details.overview && <Overview data-testid="overview" truncated={isHeroBanner}>
                    {truncate(details.overview, 250)}
                </Overview>}
            </Contents>
        </Header>
    );
}

Banner.defaultProps = {
    watchLink: undefined
}
export default Banner;
