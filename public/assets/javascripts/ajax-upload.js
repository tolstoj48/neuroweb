{
  // elements selection
  const loadingOverlay = document.getElementById("loading-overlay")
  const spinner = document.getElementById("spinner")
  // show spinner and block the inner content of the spinner div
  const showSpinner = function showSpinner() {
    loadingOverlay.className = "show"
    spinner.className = "show"
  }
  // hide spinner and block the inner content of the spinner div
  const hideSpinner = function hideSpinner() {
     loadingOverlay.className = loadingOverlay.className.replace("show", "")
     spinner.className = spinner.className.replace("show", "")
   }

  // add event listener and do fetch response on submit
  document.getElementById("upload-form")
    .addEventListener("submit", evt => {
      evt.preventDefault()
      // needed for multer or different libraries to get the data and file
      const body = new FormData(evt.target)
      const container = document.getElementById("fetch-result")
      const containerSuccess = document.querySelector(".content")
      const containerStructure = document.querySelector(".structure")
      // after submit need to show spinner
      showSpinner()
      // call fetch api and send the data
      fetch("/in-house-db/import-data", { 
        method: "post", 
        credentials: "same-origin",
        headers: {
        },
        body })
        .then(resp => {
          // if smaller then 200 status or not fullfiling all the conditions for the file in the controller 
          if(resp.status < 200 || resp.status > 400 )
            throw new Error(`Request failed with status ${resp.status}`)
          // otherwise parse to json
            return resp.json()
        })
        .then(json => {
          // then hide the spinner
          hideSpinner()
          // objects property result from controler
          if (json.result == "error") {
            container.classList.add("alert")
            container.classList.add("alert-danger")
            container.innerHTML = `${json.message}`
          } else {
            containerSuccess.classList.add("alert")
            containerSuccess.classList.add("alert-success")
            containerSuccess.innerHTML = `<b>Data has been uploaded. Please check it! </b>`
            containerStructure.innerHTML = ``
          }
        })
        // if error thrown from inside fetch api
        .catch(err => {
          hideSpinner()
          container.innerHTML = `<b>There has been an error during upload. ` +
            `Please check whether the file fullfills all requirements and try a new upload: <a href="/in-house-db/import-data">zde</a>.`
        })
    })
}