import { takeEvery, delay} from 'redux-saga'
import { all, call, put, throttle, takeLatest} from 'redux-saga/effects';

const fetchResults = (query) => {
  const route = `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${query}&key=AIzaSyCG00MA21tlOtLvoVnj6j7rkjwdAp2dxz8`
  const fetchParams = {method: 'GET'}
  return fetch(route, fetchParams).then(result => result.json());
}

function* autoCompleteSaga({type, data}):any {
  const result = yield call (fetchResults, data)
  yield put ({type: 'SET_AUTOCOMPLETE_RESULTS', data: result.predictions})
}

export function* sagas():any {
  yield all([
    takeLatest('AUTO_COMPLETE_TEXT', autoCompleteSaga),
  ]);
}
//
