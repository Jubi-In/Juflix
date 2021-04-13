import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Info from "Components/Info";

const Container = styled.div`
    height: auto;
    width: 100%;
    position: relative;
    padding: 50px;
    display: flex;
    flex-direction: column;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:url(${props => props.bgImage});
    background-size: cover;
    background-position: center center;
    filter: blur(3px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    z-index: 1;
    height: auto;
`;

const Cover = styled.div`
    width: 30%;
    background-image:url(${props => props.bgImage});
    background-size: cover;
    background-position: center center;
    height: 100vh;
    border-radius: 5px;
    @media only screen and (max-width: 768px) {
        width: 0%;
    }
`;

const Data = styled.div`
    width: 70%;
    margin-left: 30px;
`;

const Title = styled.h3`
    font-size: 32px;
`;

const ItemContainer = styled.div`
    margin: 20px 0;
`;

const Item = styled.span`
    height: 100%;
`;

const Divider = styled.span`
    margin: 0 10px;
`;

const Imdb = styled.img`
    width: 23px;
`;

const CContainer = styled.div`
    width: 50%;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.5);
    margin: 20px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: black;
`;

const CompanyLogo = styled.img`
    width: 40px;
`;

const Youtube = styled.div`
    margin-top: 20px;
`;

const InfoContainer = styled.div`
    display: flex;
    width: 80%;
    position: relative;
    height: auto;
    flex-direction: column;
    margin: 20px;
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(4, 200px);
    grid-auto-rows: 300px;
    grid-gap: 20px;
`;

const Overview = styled.p`
    font-size: 12px;
    line-height: 1.5;
    width: 50%;    
`;

const Tabs = styled.div`
    width: 50%;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.5);
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const Button = styled.button`
    width: 100px;
    height: 80%;
    background-color: transparent;
    font-size: 15px;
    letter-spacing: -0.5px;
    border: 0;
`;

const btnClick = (category) => {
    let location = null;
    if (category === 1) {
        location = window.pageYOffset + document.querySelector("#castLoc").getBoundingClientRect().top;
    } else {
        location = window.pageYOffset + document.querySelector("#seasonsLoc").getBoundingClientRect().top;
    }
    window.scrollTo({ top: location, behavior: 'smooth' });
}

const DetailPresenter = ({ result, cast, loading, error }) => {
    return (
        loading ? (
            <>
                <Helmet>
                    <title>Loading | Juflix</title>
                </Helmet>
                <Loader />
            </>
        ) : (
            error ? <Message /> :
                <Container>
                    <Helmet>
                        <title>
                            {result.original_title
                                ? result.original_title
                                : result.original_name} | Juflix
                    </title>
                    </Helmet>
                    {result.backdrop_path &&
                        <Backdrop
                            bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
                    }
                    <Content>
                        <Cover
                            bgImage={
                                result.poster_path
                                    ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                                    : require("../../assets/noPosterSmall.jpg").default
                            }
                        />
                        <Data>
                            <Title>
                                {result.original_title
                                    ? result.original_title
                                    : result.original_name}
                            </Title>
                            <ItemContainer>
                                <Item>
                                    {result.release_date
                                        ? result.release_date.substring(0, 4)
                                        : result.first_air_date.substring(0, 4)}
                                </Item>
                                <Divider>•</Divider>
                                <Item>
                                    {result.runtime || result.episode_run_time} min
                            </Item>
                                <Divider>•</Divider>
                                <Item>
                                    {result.genres &&
                                        result.genres.map((genre, index) =>
                                            index === result.genres.length - 1
                                                ? genre.name
                                                : `${genre.name} / `
                                        )}
                                </Item>
                                {result.imdb_id && <Divider>•</Divider>}
                                <Item>
                                    {result.imdb_id &&
                                        <a href={`https://www.imdb.com/title/${result.imdb_id}`}>
                                            <Imdb src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATwAAACfCAMAAABTJJXAAAAAwFBMVEX2xwAAAAD3ziX////8zAD5yQD1xgDdswDSqgCMcQCTdwAcFgAiHAByXAD/zgBgTgDhtgDFoADMpQB8ZABANADgtQCfgQCykADWrQCnhwBkUQCdfwDsvwBsVwA2LAA6LwApIQC4lQBZSAARDgBJOwAwJwD523AnHwCzkQBQQQCGbAAtJQD989D98ch3YAD//PD867b52F341lH634H++OD756P645L87bn3zTD//PH40T/52mj/1gALCQBFNwD75qX/06S8AAAIyElEQVR4nO2de1/aPBTHU2kCItRyUy5FLIgTdM45p3uc297/u3roHUpOUtrUln7O7z9JCsnXND05OTkltUDfnr4TlFTPTy8hMhKg+0EYK7phx6ANpduXXXhPJ0gusRj5uQ3vFUfdIWLsNoL3iugOlEfPgfcT2R0s9urBe0B2KcTeXHjPCC+F2K//NvCekF0qsZ8beO8IL5XYSY28ILuUYl/JP4SXUuyV/EZ4KcXeyS+Eh0KhUCgUCoVCoVAoFAqFQqHKIaoD+sw2QAoq6IZEdOvbElemgjoeg+028NptP/Z4erz4RHomoIHvh9Yv5+dCjc2oj7QpqXxe9ypTc8r5pvF4Op222711czKyu/WBaZENRH679bXG19zIG1kodga0QfO7qTehCoG6Uff0maxyw4c3AH93S4v+eH1RZ5Q3lvRT4KLzo4JnR33TpTxCeC1p1UBnjzZn/FUE3tYkQ6UkUsBz1LTio68i8KZha2ldSiElPO3PKPb4qAi8Zdha3ZZCSAtP08bmzuCrCDwtgnchrZsentav7xhFFYEX2ipghyJlgKctrS16VYHXCS3ftrRuFng7JlxV4I2CyYjdSOtmgqdNtqyiisBrBl2y5JZvNnjaIFo1VgTe2O8RteS9zwivFw69qsC78r+LDuW9zwhvMZA+nI4Mnhb0505eNSO8aH6tDDyLJK6aFV6IpjLwfFvF6MmrZoUX2nqVgeffS/pUXlUOb77qix7ajarBO/XgWXIzLwE8xiyz8Qh+Qadq8B7dqtT8Iq+aAB4llBrgKvlOrxi8leuyT+CQSgTPrWBAo7hZNXgt93FLG/KaieGBDppe1eB5fhX9MkHNpPBoBygOXK/VgeciSeCQOgBeFyieHwaPSnYwSwDPtVWMBJZKcnjQHHCTGB7VdWZZpmlaFgN3MEsAb+3CWyWomRlePyE8nQxGvfnS/Wg5X48s7gZmGeC5ExHrJ6iZGB7kZLhKBE8no/vY53PbUD361MBzbBU6SGDmHQDvD794mQAepSNeyVVH8bNEDbz7zeM2kaVyALwF8FNyeLo5B8qaam9dNfC0IYWNix0lhlcHGnYttfM+hvE7NtJaKT1F8Lo0mZn3CfDGdeCGd3Wpkp4ieBtbJZGZlx3eF5ljYLYUNsBU+NRQBG+zaDLOk1TMDo9I4EnULh+8jd1vxMLLrrkVM8NrBXGDKeFpdXX00sKLXdbfzHm7lsriL/e64uEpfOKmhRfzGF2b1Ny1Lfp8kzk7vGDDJC28efEjL75d0dVjK/lpWeFdqXtkpIUXd7d1DHv3gyY/wrZ4eGfqJr3U8GIGwciIrYjsK+51nwMPWJ14GhYPb7z79+NHLDq9Uxi8RYcwZsObUY3i4cU+vvnYXU8uhoXBG3luFXCNVgJ4scVY62OXxrXFN/Tzh7fwbks4SrV4eJOYG+AP2f17ZvD/8/nDu/e/wIZ+oATw4vuMMZjzwuDNPJ8VHLLVLR6eHvNdxAy/XmHw/vrwTMi5UgJ4H7G1a8wmHhlFzXkrQ9KzMsCDvLWeOnpR8MK9yRLDM6BTh54ahcMzoF/olACeMAy0VS8M3vkxwBNuWfQthCeC1xAtIOc6RXgCU8WC96g0rW0gPBE8g+8q9nSKI08MT7Thc4nwhPDADAmOhhThCeGJbBWT0qJcUkcBTxSbcm0hPAG8Cx2MY9LcqCmEJ4Rn8vE4ausITwiPENg1sEZ4EniCGOQLhCeBJ9j827QP4YnhwQF5JsKTwBMc7HZClBGeEJ4JXepsYNGiwi2OAx4B/SpzgvBk8Bhkqzhh0whPDE+HjsVPFMCDjhJUBh4UcXuJ8OTwIFvFIZQZHrBylobVHgE855wjaKs4/csMDyiuCjzCgEsNBfAgh5f0HMbRwOPPS0sV8KDDyvLjU0cCj/BP2I5zhZf0sHLZ4QG2invSgWaMhreB4gSnHr0KFOpZWeBNuGWXCuCBZpD0vG0Qq2JBm/LFB/p48Pi2ik2zwzPGQPEsIbwyx+e58IBH4lAFPOjMvTRBw035I0P93Fu8ooWX3ycTvPh5okjS1CB+Bgd4c6/4mGQPnsEr8p6H6eFRqhsDcHNpLIN35f1b4YPnpYHHI7TKBq9eH9ptOAncWmbntbyzZXC28OJPAPnweKnaHvVM8IRHn6K8l/AOijen6dwEF873F3/2zOsDt4WjbPAkkubP09YGJRQO4rou/tSjD88Gu5cXvK4UnjaxDAs+e3ZjqWKXER53EdXNE97ZUA5PrPPiT3r78Mz9y1v1POH99T1S6eH1ygKPcM75zPzFaT7w2tJUvzIpzKySFd7+1OKfwKFpEzSIFa7qjzm7RQBv31aZ5glvFs72aeEpfF5khcexVfy8v/nAi+65tPBG6u7arPA4iyA7R3grFjYcXmEIv+GKKFRWePvL7wBPHvC27FsQ3kg4JNUtbBXAG+xlParnBm/R3brlQHgN0ct0RkrTD2aER1ic0b2ZF7z+cHu6guDNLApGMmgXalM3poUXzNxGPF4lmJaUw5uQnTsOgue4rOI5XgLZJUl7GcDb+y8HSaApf3GZEt5ywmJPSQietz9gckJ+p3uvPCwKXugZimfgCFY/khVGXeJ5itS6aTeHcXSOkcR9G+zKmzUo7U53f2HaUJ9sGtr0jyb+u2l7X9PA0qfD3eKpHRScci5rt4N3+Fg9bnGo3vq0ObrrDAemaQEZohlXQSmlZvd0vLq6bn2ZzduXZi55uruQAkuc/w7ksCnx4rCA/5JlSTHn7cqpO+2485lp1gcWNXJJ0E3kr6U+blWnJygUCoVCoVAoFAqFQqFQx6CTohtwzHpn8joork7ID4SXUuyZvCG8lGL/yLei23C0Yg+k9huHXiqx9xqpPRTdiiMVe9vAq93i0Esh9lxz4H07QXoHi5EXF17tgSG9Q7W5aT14ta9I7zAx9lQL4NW+4p17iBh5q0Xwai/fcfAlFWPPD7VteJvB90y2w4dQPLkRVu9vAbMQ3mb0Pd2+n6CEer99eomI/Q+GcgO5Smv/RgAAAABJRU5ErkJggg==" alt="imdb" />
                                        </a>
                                    }
                                </Item>
                                <Divider>•</Divider>
                                {(Math.round(result.vote_average / 2)) === 1 && <Item>⭐ ☆ ☆ ☆ ☆</Item>}
                                {(Math.round(result.vote_average / 2)) === 2 && <Item>⭐⭐ ☆ ☆ ☆</Item>}
                                {(Math.round(result.vote_average / 2)) === 3 && <Item>⭐⭐⭐ ☆ ☆</Item>}
                                {(Math.round(result.vote_average / 2)) === 4 && <Item>⭐⭐⭐⭐ ☆</Item>}
                                {(Math.round(result.vote_average / 2)) === 5 && <Item>⭐⭐⭐⭐⭐</Item>}
                            </ItemContainer>
                            <Overview>
                                {result.overview}
                            </Overview>
                            {result.production_companies &&
                                <CContainer>
                                    {result.production_companies.map(company => company.logo_path !== null ?
                                        <CompanyLogo src={`https://image.tmdb.org/t/p/w200${company.logo_path}`} key={company.id} />
                                        :
                                        <p key={company.id}>{company.name}</p>
                                    )}
                                </CContainer>
                            }
                            {result.production_countries &&
                                <CContainer>
                                    {result.production_countries.map(country => <p key={country.iso_3166_1}>{country.name}</p>
                                    )}
                                </CContainer>
                            }
                            <Youtube>
                                {result.videos.results.length > 0 &&
                                    <iframe width="50%" height="315" src={`https://www.youtube.com/embed/${result.videos.results[0].key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
                            </Youtube>
                            {cast && result.seasons && <Tabs>
                                <Button onClick={e => btnClick(1)}>Cast</Button>
                                <Button onClick={e => btnClick(2)}>Seasons</Button>
                            </Tabs>
                            }
                        </Data>
                    </Content>
                    {cast &&
                        <Container>
                            <Title id="castLoc">Cast</Title>
                            <InfoContainer>
                                {cast.cast.map(people =>
                                    <Info
                                        key={people.id}
                                        poster={people.profile_path}
                                        name={people.name}
                                    />)
                                }
                            </InfoContainer>
                        </Container>
                    }
                    {result.seasons &&
                        <Container>
                            <Title id="seasonsLoc">All Seasons</Title>
                            <InfoContainer>
                                {result.seasons.map(season =>
                                    <Info
                                        key={season.id}
                                        poster={season.poster_path}
                                        name={season.name}
                                    />)
                                }
                            </InfoContainer>
                        </Container>
                    }
                </Container>
        )
    )
};

DetailPresenter.propTypes = {
    result: PropTypes.object,
    cast: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default DetailPresenter;