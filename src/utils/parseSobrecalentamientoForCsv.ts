import { Timestamp } from '@google-cloud/firestore';

export function parseSobrecalentamientoForCsv(timestamp: Timestamp) {
  const parsedTimestamp: Date = timestamp.toDate();
  const date = parsedTimestamp.toLocaleDateString('es-US', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const time = parsedTimestamp.toLocaleTimeString('es-US', {
    timeZone: 'America/Mexico_City',
    hour12: false,
  });

  return { date, time };
}
