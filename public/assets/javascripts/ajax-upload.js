'use strict';

{
  // Check the name of the uploaded file
  const file = document.getElementById("file")
  file.addEventListener("change", event => {
    const container = document.getElementById("fetch-result")
    const inValid = new RegExp("[\\s]")
    const result = inValid.test(event.target.files[0].name)
    if (result) {
      container.classList.add("alert")
      container.classList.add("alert-danger")
      container.innerHTML = `Remove spaces in the name of the input file. Then, try to upload again, please.`
      event.target.value = ''
    } else {
      container.classList.remove("alert")
      container.classList.remove("alert-danger")
      container.innerHTML = ``
    }
  })

  // Elements selection
  const loadingOverlay = document.getElementById("loading-overlay")
  const spinner = document.getElementById("spinner")
  // Show spinner and block the inner content of the spinner div
  const showSpinner = function showSpinner() {
    loadingOverlay.className = "show"
    spinner.className = "show"
  }
  // Hide spinner and block the inner content of the spinner div
  const hideSpinner = function hideSpinner() {
    loadingOverlay.className = loadingOverlay.className.replace("show", "")
    spinner.className = spinner.className.replace("show", "")
  }

  // Add event listener and do fetch response on submit
  document.getElementById("upload-form")
    .addEventListener("submit", evt => {
      evt.preventDefault()
      // Needed for multer or different libraries to get the data and file
      const body = new FormData(evt.target)
      const container = document.getElementById("fetch-result")
      const containerSuccess = document.querySelector(".content")
      const containerStructure = document.querySelector(".structure")
      // After submit need to show spinner
      showSpinner()
      // Call fetch api and send the data - to its location pathname
      fetch(location.pathname, {
        method: "post",
        credentials: "same-origin",
        headers: {
        },
        body
      })
        .then(resp => {
          // If smaller then 200 status or not fullfiling all the conditions for the file in the controller 
          if (resp.status < 200 || resp.status > 400) throw new Error(`Request failed with status ${resp.status}`)
          return resp.json()
          })
        .then(json => {
          // Then hide the spinner
          hideSpinner()
          // Objects property result from controler
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
        // If error thrown from inside fetch api
        .catch(err => {
          hideSpinner()
          container.classList.add("alert")
          container.classList.add("alert-danger")
          container.innerHTML = `<b>There has been an error during upload. ` +
            `Please check whether the file fullfills all requirements and try a new upload: <a href="${location.pathname}">here</a>.`
        })
    })

}