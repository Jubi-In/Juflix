import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Name = styled.span`
    position: absolute;
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.1s linear;
    font-size: 15px;
`;

const InfoPoster = styled.div`
    background-size: cover;
    background-position: center center;
    background-image:url(${props => props.poster});
    width: 100%;
    height: 100%;
    transition: opacity 0.1s linear;
`;

const Infos = styled.div`
    width: 100%;
    margin-top: 20px;
    position: relative;
    &:hover {
        ${InfoPoster} {
            opacity: 0.3;
        }
        ${Name} {
            opacity: 1;
        }
    }
`;

const Info = ({ id, poster, name }) =>
    <Infos>
        <InfoPoster poster={poster ?
            `https://image.tmdb.org/t/p/w300${poster}` :
            require("../assets/noPosterSmall.jpg").default} />
        <Name>{name}</Name>
    </Infos>

Info.protoTypes = {
    poster: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default Info;