import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 40px;
  margin-left: 40px;
`;

const Section = styled.div`
  padding: 50px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 10px;
`;

export default function FAQ() {
    return (
        <Wrapper>
            <Section>
                <SectionTitle>Non atopo unha serie ou unha película</SectionTitle>
                <div>Streamingal é posible grazas a The Movie Database, de onde se recuperan todos os datos. Se botas en falla unha película ou unha serie, é suficiente que crees unha conta e que a engadas aquí.</div>
            </Section>
            <Section>
                <SectionTitle>Atopei unha serie ou unha película con información errada ou que falta</SectionTitle>
                <div>Busca a película en The Movie Database e actualiza alí os seus datos. Os cambios reflexaranse en Streamingal en canto estén dispoñibles</div>
            </Section>
        </Wrapper>
    )
}
