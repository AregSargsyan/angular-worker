/// <reference lib="webworker" />

import { generateMockData } from "./generate-random-data";
import { interval } from 'rxjs'

addEventListener('message', ({ data }) => {
  const { action, payload } = data;

  if (action === 'START') {
    const intervalRef = interval(payload.timer).subscribe(() => {
      const mockData = generateMockData(payload.arraySize);
      postMessage(mockData);
    })

    addEventListener('message', ({ data }) => {
      if (data.action === 'STOP') {
        intervalRef.unsubscribe();
      }
    });
  }
});
