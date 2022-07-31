import styled from "styled-components";

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

function Shows() {

    return (
        <ContentWrapper>
            <span>Series</span>
        </ContentWrapper>
    );
}

export default Shows;
