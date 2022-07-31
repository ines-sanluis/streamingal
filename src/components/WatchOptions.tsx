import React, {useState} from "react";
import styled from "styled-components";
import { STREAM_OPTIONS } from "../constants";
import { Streams } from "../utils/models/streams";
import TextButton from "./TextButton";
import Provider from "./Provider";

const ButtonsWrapper = styled.div`
  padding: 5px;
  padding-left: 0px;
`;

const ProviderWrapper = styled.div`
  margin-top: 20px;
`;

const Wrapper = styled.div`
  min-height: 120px;
`;
interface WatchOptionsProps {
  options: Streams;
  title: string;
}

function WatchOptions({
    options,
    title
}: WatchOptionsProps) {

    const [streamOption, setStreamOption] = useState(STREAM_OPTIONS.FLATRATE);

    const renderProviders = () => {
        let providers = [];
        switch (streamOption) {
        case STREAM_OPTIONS.FLATRATE:
            providers = options?.flatrate || [];
            break;
        case STREAM_OPTIONS.BUY:
            providers = options?.buy || [];
            break;
        case STREAM_OPTIONS.FREE:
            providers = options?.free || [];
            break;
        case STREAM_OPTIONS.RENT:
            providers = options?.rent || [];
            break;
        default:
            providers = options?.flatrate || [];
        }
        return <ProviderWrapper>
            {providers.length > 0 && providers.map((provider) => (
                <Provider
                    provider={provider}
                    title={title}
                />
            ))}
            {providers.length === 0 && <p>
        Non hai opcións dispoñibles.
            </p>}
        </ProviderWrapper>
    }

    return <Wrapper>
        <ButtonsWrapper>
            <TextButton
                isSelected={streamOption === STREAM_OPTIONS.FLATRATE}
                onClick={() => setStreamOption(STREAM_OPTIONS.FLATRATE)}
                title="Stream"
                highlighted
            />
            <TextButton
                isSelected={streamOption === STREAM_OPTIONS.FREE}
                onClick={() => setStreamOption(STREAM_OPTIONS.FREE)}
                title="Gratis"
                highlighted
            />
            <TextButton
                isSelected={streamOption === STREAM_OPTIONS.RENT}
                onClick={() => setStreamOption(STREAM_OPTIONS.RENT)}
                title="Alquiler"
                highlighted
            />
            <TextButton
                isSelected={streamOption === STREAM_OPTIONS.BUY}
                onClick={() => setStreamOption(STREAM_OPTIONS.BUY)}
                title="En venta"
                highlighted
            />
        </ButtonsWrapper>
        {renderProviders()}
    </Wrapper>
}

export default WatchOptions;
