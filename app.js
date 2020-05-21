$(() => {
  $('.button').on('click', event => {
    event.preventDefault()


    let userInput = $('input[type="number"]').val() || 10

    let borough = $(event.target).attr('id')
    // console.log(borough);

    let link = `https://data.cityofnewyork.us/resource/fhrw-4uyv.json?borough=${borough}&agency=NYPD`

    $.ajax({
      url: link,
      type: 'GET',
      data: {
        "$limit": userInput
      }
    })
    .then((reports) => {
      // console.log(reports)
      for (let report of reports) {
        console.log(report);
        const $reports = $('.reports')

        // append 1 div per report
        const $div = $('<div>').appendTo($reports)

        // create an h3 add the descriptor from the data append it to div
        const $h3 = $('<h3>').text(report.descriptor).appendTo($div)

        const $text = $('<p>').text(report.resolution_description).appendTo($div).hide()

        const $policeButton = $('<button>').text("What did the police do?").appendTo($div)
        .on('click', (event) => {
          $(event.currentTarget).prev().toggle()
        })
      }
    })
    .catch(err=>{
      console.log(err);
    })
  })
})
