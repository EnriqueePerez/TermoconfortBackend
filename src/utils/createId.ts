export function createId(
  cr: string,
  unit: string,
  type: string,
  collection?: string
) {
  const now = new Date().toLocaleDateString('en-US', {
    timeZone: 'America/Mexico_City',
    year: '2-digit',
    month: 'short',
    day: '2-digit',
  }); //NOV 13, 02

  const month = now.slice(0, 3).toUpperCase(); //NOV
  const year = now.slice(-2); //21
  const shortUnit = parseUnit(unit); //CO1, CO2, CER, HIE, CL1, CL2

  if (collection === 'SobrecalentamientosAdicionales') {
    const id = `${type}${cr}${month}${year}${shortUnit}V2`;
    return id;
  } else {
    const id = `${type}${cr}${month}${year}${shortUnit}`;
    return id;
  }
}

function parseUnit(unit: string) {
  switch (unit) {
    case 'Conservación 1':
      return 'CO1';
    case 'Conservación 2':
      return 'CO2';
    case 'Cerveza':
      return 'CER';
    case 'Hielo':
      return 'HIE';
    case 'Clima 1':
      return 'CL1';
    case 'Clima 2':
      return 'CL2';
  }
}

// const newID = createId('9TA', 'Clima 2', 'ET', true);
// console.log(newID);
