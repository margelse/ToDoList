const CreateForm = document.querySelector(".create__new-window");
const Form = document.querySelector(".create__form");
const startForm = document.querySelector(".form")

CreateForm.addEventListener("click", function () {
    CreateForm.classList.add("none");
    Form.classList.remove("none");
});


const textEmptyPage = document.getElementById("textEmptyPage");
const AddBtn = document.getElementById("AddCard");

const contentArea = document.querySelector(".empty-page__content");
let count = 0;
const notes = [
    
];

AddBtn.addEventListener("click", function () {
    textEmptyPage.classList.add("none");

    let inputName = document.getElementById("exampleFormControlInput1").value;
    let inputTextarea = document.getElementById("exampleFormControlTextarea1").value;
    let finishDate = document.getElementById("finish-date").value;

    let currentDateTime = new Date();

    // Форматируем дату и время (можно настроить по своему)
    const formattedDate = currentDateTime.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    if (inputName != 0 && inputTextarea != 0) {
        notes.push({
            id: (notes.length + 1),
            idClone: ((-notes.length - 1)),
            title: inputName,
            text: inputTextarea,
            date: formattedDate,
            finishDate: finishDate,
        });
        count += 1;
    }


    if (inputName === "" && inputTextarea !== "") {
        notes.push({
            id: (notes.length + 1),
            idClone: ((-notes.length - 1)),
            title: `Untitle ${Math.abs(notes.length - count)}`,
            text: inputTextarea,
            date: formattedDate,
            finishDate: finishDate,

        });
    }

    if (inputTextarea == 0) {
        startForm.reset();
        return 0;
    }

    const lastNote = notes[notes.length - 1];
    const html = `
    <div class="card text-center" style="min-height: 330px;">
        <div class="card-header">
            Дата завершения: ${lastNote.finishDate}
        </div>
        <div class="card-body">
            <h5 class="card-title">${lastNote.title}</h5>
            <p class="card-text">${lastNote.text}</p>
            <button data-action="delete" data-id="${lastNote.id}" class="btn btn-primary">Удалить</button>
            <button data-action="clone" data-id="${lastNote.idClone}" class="btn btn-primary">Копировать</button>
        </div>
        <div class="card-footer text-body-secondary">
            Дата создания: ${lastNote.date}
        </div>
    </div>
    `
    contentArea.insertAdjacentHTML('afterbegin', html);
    startForm.reset();


});

document.addEventListener("click", (event) => {
    if (event.target.dataset.action === "delete") {
        const id = event.target.dataset.id;
        console.log(id);

        const index = notes.findIndex((item) => {
            return item.id == id;
        });
        console.log(index)
        console.log(notes[index]);
        notes.splice(index, 1);
        event.target.closest(".card").remove();
    }
});

document.addEventListener("click", (event) => {
    if (event.target.dataset.action === "clone") {
        const id = event.target.dataset.id;


        const index = notes.findIndex((item) => {
            return item.id == Math.abs(id);
        });

        let currentDateTime = new Date();

        // Форматируем дату и время (можно настроить по своему)
        const formattedDate = currentDateTime.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        notes.push({
            id: (notes.length + 1),
            idClone: ((-notes.length - 1)),
            title: notes[index].title,
            text: notes[index].text,
            date: formattedDate,
            finishDate: notes[index].finishDate,
        });

        const lastNote = notes[notes.length - 1];
        const html = `
    <div class="card text-center" style="min-height: 330px;">
        <div class="card-header">
            Дата завершения: ${lastNote.finishDate}
        </div>
        <div class="card-body">
            <h5 class="card-title">${lastNote.title}</h5>
            <p class="card-text">${lastNote.text}</p>
            <button data-action="delete" data-id="${lastNote.id}" class="btn btn-primary">Удалить</button>
            <button data-action="clone" data-id="${lastNote.idClone}" class="btn btn-primary">Копировать</button>
        </div>
        <div class="card-footer text-body-secondary">
            Дата создания: ${lastNote.date}
        </div>
    </div>
    `
        contentArea.insertAdjacentHTML('afterbegin', html);
    }
});


const historyLink = document.querySelector(".page__history-link");

historyLink.addEventListener("click", function() {
    localStorage.setItem('notes', JSON.stringify(notes))
})