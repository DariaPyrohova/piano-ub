//input
const melodiesDatalist = document.querySelector('#melodies');
const melodies = [
  'Pink Panther: re-diez-1[120] mi-1[480] 360 fa-diez-1[120] sol-1[480] 360 re-diez-1[120] mi-1[360] fa-diez-1[120] sol-1[360] do-2[120] si-1[360] mi-1[120] sol-1[360] si[120] la-diez-1[960] 160 la-1[160] sol-1[160] mi-1[160] re-1[160] mi-1[160]',
  'Shchedryk: (do-2 re-diez-2)[300] re-2[150] re-diez-2[150] do-2[300] (la-diez-1 re-diez-2)[300] re-2[150] re-diez-2[150] do-2[300] (sol-diez-1 re-diez-2)[300] re-2[150] re-diez-2[150] do-2[300] (sol-1 re-diez-2)[300] re-2[150] re-diez-2[150] do-2[300] (sol-diez-1 re-diez-2)[300] re-2[150] re-diez-2[150] do-2[300] (sol-1 re-diez-2)[300] re-2[150] re-diez-2[150] do-2[300] (fa-1 re-diez-2)[300] re-2[150] re-diez-2[150] do-2[300] (do-1 re-diez-2)[300] re-2[150] re-diez-2[150] do-2[300]'
];

showMelodiesList();

function showMelodiesList() {
  const addedMelodies = addMelodiesToList();
  melodiesDatalist.innerHTML = addedMelodies;
}

function addMelodiesToList() {
  let melodiesHTML = '';
  for (const melody of melodies) {
    melodiesHTML += `<option value="${melody}"></option>`;
  }
  return melodiesHTML;
}
