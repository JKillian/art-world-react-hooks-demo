import React, { Component, useContext, useState, useEffect, useMemo, useImperativeHandle, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { any } from 'prop-types';

type ValuesOf<T> = (T)[keyof T];

const Theme = {
  LIGHT: 'light' as 'light',
  DARK: 'dark' as 'dark',
};
type ThemeType = (typeof Theme)[keyof typeof Theme];
type ThemeType2 = ValuesOf<typeof Theme>;

const ThemeContext = React.createContext<ThemeType>(Theme.LIGHT);

function App() {
  const [theme, setTheme] = useState<ThemeType>(Theme.DARK);
  const [counter, setCounter] = useState(0);
  const artRef = useRef<ArtAPI>(null)

  return <ThemeContext.Provider value={theme}>
    <div>
      <button onClick={() => setTheme(Theme.LIGHT)}>Light</button>
      <button onClick={() => setTheme(Theme.DARK)}>Dark</button>
      <button onClick={() => setCounter(c => c + 1)}>Counter</button>
      <button onClick={() => artRef.current!.randomize()}>Randomioze</button>
      <p>Hello</p>
      {counter < 5 && <ArtDisplay ref={artRef} /> }
    </div>
  </ThemeContext.Provider>
}

interface ArtAPI {
  randomize(): void;
}
const ArtDisplay = React.memo(React.forwardRef<ArtAPI>(function (_, ref) {
  const theme = useContext(ThemeContext);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    console.log("subescribe")
    return () => console.log("unsubscribe");
  }, []);
  console.log("in the body")

  useImperativeHandle<ArtAPI, ArtAPI>(ref, () => ({
    randomize: () => setRenderKey(r => r+ 1)
  }));

  const style = {
    background: theme === 'light' ? '#efefef' : '#123421',
    width: '300px',
    height: '300px',
  }
  return <div style={style} key={renderKey}>
    <ArtLine />
    <ArtLine />
    <ArtLine />
    <ArtLine />
    <ArtLine />
    <ArtLine />
    <ArtLine />
    <ArtLine />
    <ArtLine />
    <ArtLine />
    <ArtLine />
    <ArtLine />
    <ArtLine />
    <ArtLine />
    <ArtLine />
  </div>;
}));

const ArtLine = () => {
  const styles = useMemo(() => ({
    background: 'red',
    width: randBetween(10, 200),
    height: randBetween(1, 20),
    transform: `translate(${randBetween(1, 300)}, ${randBetween(1,300)}) rotate(${randBetween(0, 360, 'deg')})`
  }), []);
  console.log('artline')
  return <div style={styles} />;
}

const randBetween = (min:number, max:number, units = 'px') =>
  Math.floor(Math.random() * (max - min) + min) + units;

export default App;
