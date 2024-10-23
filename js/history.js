

function readNotes() {
    const notes = localStorage.getItem('notes');

    if (notes === null) {
        return undefined
    }

    // Если вдруг в хранилище оказался невалидный JSON,
    // предохраняемся от этого
    try {
        return JSON.parse(notes)
    } catch (e) {
        localStorage.removeItem('notes')
        return undefined
    }
}


const historyList = document.querySelector(".accordion");

readNotes().forEach(element => {
    const multiCollapseExample = `multiCollapseExample` + `${element.id}`;
    const multiCollapseExample_1 = `#multiCollapseExample` + `${element.id}`;
    const html_histoty = `
    <div class="accordion-item">
        <h4 class="accordion-header">
            <ul style="display: flex; justify-content: space-between; gap: 5px;">
                <li>${element.title}</li>
                <li>${element.date}</li>
                <li>${element.finishDate}</li>
            </ul>
            <p class="d-inline-flex gap-1">
                <button class="btn btn-primary" data-bs-toggle="collapse" href="${multiCollapseExample_1}" role="button" aria-expanded="false">Toggle first element</button>
            </p>
            <div class="row">
                <div class="col">
                    <div class="collapse multi-collapse" id="${multiCollapseExample}">
                    <div class="card card-body">
                        ${element.text}
                    </div>
                    </div>
                </div>
            </div>
        </h4>
        
    </div>
    `
    historyList.insertAdjacentHTML('afterbegin', html_histoty);
});