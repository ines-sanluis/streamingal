import React, {useCallback} from "react"
import styled from "styled-components";
import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (props: number) => void;
}

const PageContainer = styled.div`
  float: right;
  padding-right: 40px;
`;

const Page = styled.span`
  padding: 20px;
  font-size: 10pt;
  font-weight: 700;
`

function Pagination({
    currentPage,
    totalPages,
    goToPage
} : PaginationProps) {

    const goToPrevious = useCallback(
        () => {
            goToPage(currentPage - 1);
        },
        [currentPage, goToPage]
    )

    const goToNext = useCallback(
        () => {
            goToPage(currentPage + 1);
        },
        [currentPage, goToPage]
    )

    const scrollDown = useCallback(
        ({y}) => {
            window.scrollTo({
                top: y,
                behavior: "smooth"
            });
        },
        []
    );

    return (
        <PageContainer>
            {currentPage > 1 && <Button
                text="Anterior"
                onFocus={scrollDown}
                onEnterPress={goToPrevious}
                onClickHandler={goToPrevious}
            />}
            <Page>Páxina {currentPage} de {totalPages}</Page>
            {currentPage < totalPages && <Button
                text="Seguinte"
                onFocus={scrollDown}
                onEnterPress={goToNext}
                onClickHandler={goToNext}
            />}
        </PageContainer>
    )
}

export default Pagination;
