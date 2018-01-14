import {Observable} from "rxjs";
import {observable} from "rxjs/symbol/observable";

const button = document.querySelector('button');
const output = document.querySelector('#output');


let click = Observable.fromEvent(button, 'click');

function load(url: string){
    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("load",  ()=>{
            if(xhr.status === 200){
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
                console.table(data);
            }else{
                observer.error(xhr.statusText);
            }
        })
        xhr.open('GET', url);
        xhr.send();
    }).map((a) => a.sort((a, b) => a.pages > b.pages));
}
function renderBooks(books){
    books.forEach(b => {
        let node = document.createElement('div');
        node.innerText = `title ${b.title}   strony ${b.pages}`;
        output.appendChild(node);
    })

}
click.flatMap(e => load('/books-api.json'))
    .subscribe(
        renderBooks,//(e) => console.log(e),  //next
        (e) => console.log(`error ${e}`), //error
        () =>  console.log(`done`) //complete

    );
