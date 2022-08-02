import { FocusableComponentLayout, FocusDetails, KeyPressDetails, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import styled from "styled-components";
import { IMAGE_BASE_URL } from "../constants";
import { hexToRgba } from "../utils/colors";
import { Show, Movie, getAssetDetails } from "../utils/models/asset";

interface FocusedProps {
  focused: boolean
}

interface AssetWrapperProps extends FocusedProps {
  marginBottom: boolean;
}

const AssetWrapper = styled.div<AssetWrapperProps>`
  margin-right: 15px;
  width: 250px;
  height: 197px;
  margin-bottom: ${({ marginBottom }) => marginBottom && "10px"};
`;

  interface AssetBoxProps {
    focused: boolean;
    src: string;
    hasBackdrop: boolean;
  }

const AssetBox = styled.div<AssetBoxProps>`
  box-shadow: ${({ focused, theme }) => focused && `0px 15px 25px ${hexToRgba(theme.colors.accent, 0.79)}`};
  transform: ${({ focused }) => focused && "scale(1.08)"};
  transition: transform 450ms;
  width: 250px;
  height: 140px;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: ${({ focused }) => focused ? "7px" : "10px"};
  border: none;
  background-color: ${({hasBackdrop}) => !hasBackdrop && "#292929"};
  background-image: ${({src}) => `url(${src})`};
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
`;

const AssetTitle = styled.p<FocusedProps>`
  margin-top: 30px;
  font-weight: 400;
  visibility: ${({ focused }) => !focused && "hidden"}
`;

interface AssetProps {
  asset: Show | Movie;
  onEnterPress: (props: object, details: KeyPressDetails) => void;
  onClickHandler: (props: object) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
  marginBottom?: boolean;
}

function Asset({asset, onEnterPress, onClickHandler, onFocus, marginBottom }: AssetProps) {
    const { ref, focused, focusSelf } = useFocusable({
        onEnterPress,
        onFocus,
        extraProps: {
            asset
        }
    });

    const details = getAssetDetails(asset);
    const background = details.backdrop_path || details.poster_path;
    return (
        <AssetWrapper
            marginBottom={marginBottom}
            ref={ref}
            focused={focused}
            onClick={() => onClickHandler({asset})}
        >
            <AssetBox
                hasBackdrop={background !== null}
                src={`${IMAGE_BASE_URL}/${background}`}
                focused={focused}
                onMouseOver={() => focusSelf()}
            />
            <AssetTitle focused={focused}>{details.title}</AssetTitle>
        </AssetWrapper>
    );
}

Asset.defaultProps = {
    marginBottom: false
}
export default Asset;
