import { createGlobalStyle } from "styled-components";

export interface DefaultTheme {
    id: string;
    name: string;
    colors: {
        accent: string;
        body: string;
        text: string;
        button: {
            default: {
                text: string;
                background: string;
            },
            focused: {
                text: string;
                background: string;
            }
        },
        input: {
            icon: string;
            background: string;
            border: string;
        }
    },
    font: string;
}
export const GlobalStyles = createGlobalStyle<{theme: DefaultTheme}>`
    ::-webkit-scrollbar {
        display: none;
    }
    body {
        font-size: 17px;
        background-color: ${({ theme }) => theme.colors.body};
        color: ${({ theme }) => theme.colors.text};
        font-family: ${({ theme }) => theme.font};
        transition: all 0.50s linear;
    }
`;