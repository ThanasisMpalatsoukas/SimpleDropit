import SimpleDropit from '../src/index';
import { execCopyCommand } from './helpers';
import { tooltip } from 'bootstrap';
import hljs from 'highlight.js';

// Polyfills
import 'whatwg-fetch';

// Styles
import '../src/assets/scss/simpledropit.scss';
import './assets/scss/demo.scss';
import 'highlight.js/scss/github.scss';

document.addEventListener('DOMContentLoaded', (event) => {
    const sdFileInput = new SimpleDropit(document.getElementById('sd-fileInput'));
    const myInput = new SimpleDropit(document.getElementById('myInput'));
    const myInput2 = new SimpleDropit(document.getElementById('myInput2'));

    hljs.highlightAll();

    // Add Copy Button to all Code Snippets
    document.querySelectorAll('pre.sd-code-snippets').forEach((pre) => {
        let btn = document.createElement('button');

        ['btn', 'btn-outline-secondary', 'btn-copy', 'sd-btn-copy', 'btn-sm'].forEach(className => {
            btn.classList.add(className);
        });
        btn.innerText = 'Copy';

        pre.prepend(btn);
    });

    document.querySelectorAll('.btn-copy').forEach((btn) => {
        btn.addEventListener('click', (event) => {
            execCopyCommand(event.target.parentElement.querySelector('code'))
            // if(execCopyCommand(event.target.parentElement.querySelector('code'))) {
            //     console.log('Copied to clipboard...');
            // }
        });
    });

    const date = new Date();
    document.querySelector('.copyright').innerHTML = `Released under the MIT License Copyright &copy; ${date.getFullYear()} Nish K.`;

    fetch("https://world-clock.p.rapidapi.com/json/utc/now", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "849b4ca81amsheeadae45451103fp1a465ejsn78e349b6e56e",
            "x-rapidapi-host": "world-clock.p.rapidapi.com"
        }
    })
    .then(response => response.json())
    .then(data => {
        const date = new Date(data.currentDateTime);
        document.querySelector('.copyright').innerHTML = `Released under the MIT License Copyright &copy; ${date.getFullYear()} Nish K.`;
    })
    .catch(err => {
        console.error(err);
    });
});