import { RichText } from "prismic-reactjs";
import Image from "next/image";
import styled from "styled-components";

export default function KontaktBanner({ data }) {
  return (
    <Container>
      <InnerContainer>
        {RichText.render(data.primary.titel)}
        <SocialLinksContainer className="socialLinks">
          {data.fields.map((link, idx) => (
            <SocialLinkItem
              href={link.link.url}
              key={idx}
              target={link.link.target}
            >
              <Image
                src={link.icon.url}
                alt={link.icon.alt}
                width={30}
                height={30}
                objectFit="contain"
              />
            </SocialLinkItem>
          ))}
        </SocialLinksContainer>
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: var(--bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0rem;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: var(--main-width);
  padding: 0 1rem;
  width: 100%;
  margin: 0 auto;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    gap: 3rem;
  }
  h2 {
    font-weight: 700;
  }
`;

const SocialLinksContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLinkItem = styled.a`
  border: 2px solid rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 999px;
  transition: 0.6s;
  filter: invert(1);
  :hover {
    filter: brightness(0.7);
  }
  img {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
`;
