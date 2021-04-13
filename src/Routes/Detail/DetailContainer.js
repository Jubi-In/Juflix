import { moviesApi, tvApi } from "api";
import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class DetailContainer extends React.Component {
    constructor(props) {
        super(props);
        const { location: { pathname } } = props;
        this.state = {
            result: null,
            cast: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/")
        };
    }

    async componentDidMount() {
        const {
            match: {
                params: { id }
            },
            history: { push },
        } = this.props;
        const { isMovie } = this.state;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push("/");
        }
        let result = null;
        let cast = null;
        try {
            if(isMovie) {
                ({ data: result } = await moviesApi.movieDetail(parsedId));
                console.log(moviesApi.cast(parsedId));
            } else {
                ({ data: result } = await tvApi.showDetail(parsedId));
                ({ data: cast } = await tvApi.cast(parsedId));
                console.log(cast);
            }
        } catch {
            this.setState( { error: "Can't find"});
        } finally {
            this.setState({ loading: false, result, cast })
        }
    }

    render() {
        const { result, cast, error, loading } = this.state;
        return <DetailPresenter result={result} cast={cast} error={error} loading={loading} />;
    }
}