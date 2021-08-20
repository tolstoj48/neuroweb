'use strict';

// Searches the whole content of the result table from db search on server side and hides irrelevant
function searchTable() {
  let input, filter, found, table, tr, trHidden, td, p;
  input = document.getElementById('search-on-results');
  filter = input.value.toUpperCase();
  table = document.getElementById('gene-positions');
  tr = table.getElementsByClassName('searched-row');
  // Searching all the visible columns
  for (let i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td');
    for (let j = 0; j < td.length; j++) {
      if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
        found = true;
      }
    }
    // If found display, otherwise hide
    if (found) {
      tr[i].style.display = '';
      found = false;
    } else {
      tr[i].style.display = 'none';
    }
  }
  // Searching all the hidden rows
  trHidden = table.getElementsByClassName('searched-hidden-row');
  for (let i = 0; i < trHidden.length; i++) {
    p = trHidden[i].getElementsByTagName('p');
    for (let j = 0; j < p.length; j++) {
      if (p[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
        found = true;
      }
    }
    /* 
      The number of hidden rows must be equal to visible rows -> same index
      Change the visibility to visible only if there is anything in the <p> texts,
      otherwise the previousle setup visible rows would be hidden.
    */
    if (found) {
      tr[i].style.display = '';
      found = false;
    }
  }
}