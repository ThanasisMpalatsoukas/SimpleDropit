import SimpleDropit from '../src/index';
import { execCopyCommand } from './helpers';
import { Tooltip } from 'bootstrap';
import hljs from 'highlight.js';

// Polyfills
import 'whatwg-fetch';

// Styles
import './assets/scss/demo.scss';
import '../src/assets/scss/simpledropit.scss';
import 'highlight.js/scss/github.scss';

document.addEventListener('DOMContentLoaded', (event) => {
    const sdFileInput = new SimpleDropit(document.getElementById('sd-fileInput'));
    const myInput = new SimpleDropit(document.getElementById('myInput'));
    const myInput2 = new SimpleDropit(document.getElementById('myInput2'));

    hljs.highlightAll();

    const clipboardIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard align-text-top pe-none" viewBox="0 0 16 16">
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
        </svg>`;
    const check2Icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
        </svg>`;

    // Add Copy Button to all Code Snippets
    document.querySelectorAll('pre.sd-code-snippets').forEach((pre) => {
        let btn = document.createElement('button');

        ['btn', 'btn-outline-secondary', 'btn-copy', 'sd-btn-copy', 'btn-sm'].forEach(className => {
            btn.classList.add(className);
        });
        btn.innerHTML = clipboardIcon;

        let tooltip = new Tooltip(btn, {
            placement: 'left',
            trigger: 'manual hover focus'
        });

        pre.prepend(btn);
    });

    document.querySelector('.wrapper').addEventListener( 'click', (event) => {
        if(event.target.classList.contains('btn-copy') && !event.target.classList.contains('btn-outline-success')) {
            if(execCopyCommand(event.target.parentElement.querySelector('code'))) {
                // Copied to clipboard
                event.target.classList.remove('btn-outline-secondary');
                event.target.classList.add('btn-outline-success');
                event.target.setAttribute('data-bs-original-title', 'Copied!');
                event.target.innerHTML = check2Icon;
                let tooltip = Tooltip.getInstance(event.target);
                tooltip.show();
                setTimeout(() => {
                    event.target.innerHTML = clipboardIcon;
                    event.target.classList.remove('btn-outline-success');
                    event.target.classList.add('btn-outline-secondary');
                    tooltip.hide();
                    event.target.setAttribute('data-bs-original-title', '');
                }, 2000);
            }

            event.preventDefault();
            event.stopPropagation();
        }
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