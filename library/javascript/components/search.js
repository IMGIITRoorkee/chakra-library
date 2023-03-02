function open_search() {
  document.getElementById('search-modal')?.remove();
  document.getElementById('results-list')?.remove();
  var search_modal = document.createElement('div');
  search_modal.setAttribute('id', 'search-modal');
  var input_parent = document.createElement('div');
  var search_div = document.createElement('div');
  search_div.style.border = '1px';
  search_div.style.display = 'inline-block';
  var search_icon = document.createElement('img');
  search_icon.setAttribute('data-icon', 'search');
  search_icon.setAttribute('class', 'ui icon');
  search_icon.style.height = '1rem';
  search_icon.style.width = 'auto';
  search_icon.style.marginTop = '0.5rem';
  search_div.appendChild(search_icon);
  search_div.style.background = 'white';
  search_div.style.height = 'auto';
  search_div.style.marginTop = '5rem';
  search_div.style.width = '750px';
  input_parent.style.textAlign = 'center';
  input_parent.style.alignContent = 'center';
  var input_tag = document.createElement('input');
  input_tag.style.width = '700px';
  input_tag.style.height = '30px';
  input_tag.style.padding = '5px';
  input_tag.style.border = 'none';
  input_tag.setAttribute('placeholder', 'What are you looking for?');
  input_tag.setAttribute('id', 'search-input');
  var go_back = document.createElement('span');
  go_back.setAttribute('onClick', 'close_search()');
  go_back.innerHTML =
    '<img class="ui icon" data-icon="leftarrow" />&nbsp;GO BACK';
  go_back.style.color = '#cdcdcd';
  go_back.style.cursor = 'pointer';
  go_back.style.marginLeft = '15rem';
  search_modal.appendChild(go_back);
  input_tag.addEventListener('focus', function () {
    this.style.border = 'none';
    this.style.outline = 'none';
  });
  search_div.appendChild(input_tag);
  input_parent.appendChild(search_div);
  search_modal.appendChild(input_parent);
  search_modal.style.zIndex = '10000';
  search_modal.style.position = 'fixed';
  search_modal.style.top = '0';
  search_modal.style.left = '0';
  search_modal.style.height = '100vh';
  search_modal.style.width = '100vw';
  search_modal.style.background = '#313131';
  search_modal.style.paddingTop = '5rem';
  document.body.appendChild(search_modal);
  document.body.style.overflow = 'hidden';
  var script = document.createElement('script');
  script.setAttribute(
    'src',
    'https://cmsredesign.channeli.in/library/javascript/components/search_function.js'
  );
  document.body.appendChild(script);
  loadIcons();
  document.getElementById('search-input').focus();
}

function close_search() {
  document.getElementById('search-modal')?.remove();
  document.getElementById('results-list')?.remove();
  document.body.style.overflow = 'auto';
}
