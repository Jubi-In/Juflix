# Juflix

Learning React and ES6 by building a Movie Discovery App.

## Screens

- [ ] Home
- [ ] TV Shows
- [ ] Search
- [ ] Detail

## API Verbs

- [ ] Now playing (Movie)
- [ ] Top Rated (TV, Movie)
- [ ] Popular (TV, Movie)
- [ ] Upcoming (Movie)
- [ ] Airing Today (TV)
- [ ] TV show Detail
- [ ] Moive Detail
- [ ] Search (TV, Movie)

## Study

1. 3.4 WithRouter
- 정의: 라우트가 아닌 컴포턴트에서 라우터에서 사용하는 객체(prop? location, match, history)를 사용하려면 withRouter를 사용해야 한다.
- Router Props: 브라우저와 리액트 앱의 라우터를 연결하게 되면 그 결과 라우터가 history api에 접근할 수 있게 되며, 각각의 Route와 연결된 컴포넌트에 props로 match, location, history라는 객체를 전달하게 된다.
(출처: https://gongbu-ing.tistory.com/45)

2. 5.2 async / await
- async ComponentDidMount() {
    const nowPlaying = await moviesApi.nowPlaying();
    console.log(nowPlaying);
}
- await가 붙음으로써 해당 코드가 finish 될 때까지 기다린 후 다음 코드를 진행. 예시 코드에서 api를 호출하는 요청이 끝난 후 console.log에서 nowPlaying을 출력. 없을 때는 기다리지 않고 출력.

3. 6.1 children
- react prop. 

4. 2.1 Fragment
- 원하는 만큼 컴포턴트를 리턴하게 해 준다. <> </>