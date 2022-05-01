import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import dayjs from "dayjs";
import Link from "next/link";
import ShareIcon from "./../public/share.svg";

export default function Buch_Detail({ data }) {
  console.log(data);
  function handleShare() {
    if (navigator.share) {
      navigator
        .share({
          title: "colinhadler.at",
          text: "Check out web.dev.",
          url: "https://web.dev/",
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
  }
  return (
    <>
      <Container>
        <BackLink>
          <Link href="/buecher">
            <BackLinkA>Zur Übersicht</BackLinkA>
          </Link>
        </BackLink>
        <Header>
          <Cover src={data.primary.buch.cover.url} />
          <Infos>
            <TitleContainer>
              <TitleLeftSection>
                <NewIndicator>Neu</NewIndicator>
                {RichText.render(data.primary.buch.titel)}
              </TitleLeftSection>
              <ShareBtn onClick={handleShare}>
                <ShareIcon />
              </ShareBtn>
            </TitleContainer>
            {dayjs(data.primary.buch.erscheinungsdatum).format("YYYY")}
            <MerchantsContainer>
              {data.primary.buch.listoflinks &&
                data.primary.buch.listoflinks.map((merchant, idx) => (
                  <>
                    <MerchantItem href={merchant.link.url} key={idx}>
                      <Logo src={merchant.merchant.logo_of_merchant.url} />
                    </MerchantItem>
                  </>
                ))}
            </MerchantsContainer>
            <p>Am besten bestellen Sie in Ihrer lokalen Buchhandlung!</p>
          </Infos>
        </Header>
        <Description>
          {RichText.render(data.primary.buch.beschreibung)}
        </Description>
      </Container>

      <ReviewsContainer>
        {data.primary.buch.rezensionen.map((review, idx) => (
          <ReviewItem key={idx}>
            <ReviewQoute>{RichText.render(review.text)}</ReviewQoute>
            <ReviewAuthor>{RichText.render(review.name)}</ReviewAuthor>
          </ReviewItem>
        ))}
      </ReviewsContainer>
    </>
  );
}

const ShareBtn = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    margin: 0;
  }
  div {
  }
`;

const TitleLeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
const NewIndicator = styled.div`
  color: var(--orange);
  border: 1px solid var(--orange);
  text-transform: uppercase;
  padding: 0.5em;
  border-radius: var(--border-radius);
  font-size: 0.75rem;
`;
const BackLinkA = styled.a`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  font-size: 0.85rem;
  :before {
    display: inline-block;
    content: "";
    background: url("arrow-left.svg");
    width: 20px;
    height: 20px;
    margin-right: 0.25rem;
  }
  :after {
    transition: all 0.2s ease-in-out;
    position: relative;
    content: "";
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 1px;
    transform: scaleX(0);
    transform-origin: right center;
    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1),
      -webkit-transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
    background-color: black;
    left: 0;
  }
  &:hover {
    cursor: pointer;
    &:after {
      transform: scaleX(1);
      transform-origin: left center;
    }
  }
`;
const BackLink = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 4rem;
  text-transform: uppercase;
  font-weight: 100;
`;
const Container = styled.div`
  padding: 1rem;
  max-width: var(--main-width);
  margin: 0 auto;
  margin-top: var(--navbar-height);
  @media screen and (max-width: 768px) {
    margin-top: var(--navbar-mobile-height);
  }
`;
const MerchantsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
`;
const Description = styled.div`
  max-width: 70ch;
  margin: 6rem auto;
  text-align: justify;
`;
const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const Cover = styled.img`
  width: 100%;
  height: 500px;
  object-fit: contain;
  @media screen and (max-width: 768px) {
    height: 350px;
  }
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    margin-top: 2em;
  }
`;

const Logo = styled.img`
  width: 30%;
  @media screen and (max-width: 768px) {
    width: 50%;
  }
`;

const MerchantItem = styled.a`
  border: 1px solid black;
  border-radius: var(--border-radius);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  transition: 0.4s;
  filter: saturate(0);
  &:hover {
    filter: saturate(1);
  }
`;

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  background-color: rgb(40, 40, 40);
  color: white;
`;

const ReviewItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 70ch;
  margin: 2rem auto;
  padding: 1rem;
`;
const ReviewQoute = styled.div`
  font-style: italic;
  font-weight: 500;
`;
const ReviewAuthor = styled.div`
  width: 100%;
  text-align: right;
`;
