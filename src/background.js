window.packages = {}
window.currentUrl;
chrome.tabs.onActivated.addListener(tab => {
  console.log(tab)
  chrome.tabs.get(tab.tabId, current_tab_info => {
    if(/^(http|https):\/\/[^ "]+\/api\/3\/action\/package_list/.test(current_tab_info.url)) {
      let url = current_tab_info.url;
      fetch(url)
      .then(res => res.json())
      .then((out) => {
        console.log('Checkout this JSON! ', out);
        window.packages = out.result;
        window.currentUrl = url;
      })
      .catch(err => { throw err });
    }
  })
});
