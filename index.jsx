// Uebersicht Starter Template
import { styled } from 'uebersicht'

// emotion styled components
const App = styled('div')`
  h1 {
    font-family: Roboto;
    font-weight: 300;
    font-size: 0.75rem;
    color: white;
    opacity: 0.8;
    span {
      font-size: 0.75rem;
      margin-right: 0.25rem;
    }
  }

`

// const Box = styled("div")(props => ({
//   height: "40px",
//   width: "40px",
//   background: props.color,
//   marginRight: "5px"
// }))

// className is root wrapper of module
export const className = `
  bottom: 0;
  left: 0.5rem;
  color: #fff;
`

const apiUrl = 'https://api.covid19api.com/summary'
// api output
/*
{
  "Global": {
    "NewConfirmed": 86850,
    "TotalConfirmed": 2894581,
    "NewDeaths": 5839,
    "TotalDeaths": 202795,
    "NewRecovered": 27616,
    "TotalRecovered": 815948
  },
  ...
}
*/

export const refreshFrequency = 1000 * 60 * 15; // widget will run command once every 15 minutes

export const command = (dispatch) => {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      dispatch({ type: 'FETCH_SUCCEEDED', data: data });
    })
    .catch((error) => {
      dispatch({ type: 'FETCH_FAILED', error: error });
    });
}

export const initialState = { output: 'fetching data...' };

// similar to setState (Redux pattern), event is dispatch output
export const updateState = (event, previousState) => {
  if (event.error) {
    // return { ...previousState, output: `We got an error: ${event.error}` };
    console.error(event.error)
    // output empty string to avoid error displayed on screen
    return { ...previousState, output: '' }
  }
  return {
    ...previousState,
    output: event.data
  };
}

// react functional component
// if output is a string then simply display
export const render = ({ output, error }) => {
  return error ? (
    <div>Something went wrong: <strong>{String(error)}</strong></div>
  ) : (
      <App>
        {typeof output === 'string' ? <p>{output}</p> : (
          <h1><span>☠️</span>{output.Global.TotalDeaths}</h1>
        )}
      </App>
    );
}
