import './styles/resets.scss'
import './styles/base.scss'
import './styles/form.scss'
import './styles/footer.scss'
import './styles/header.scss'

const fetch = window.fetch.bind(window);
Client.setFetch(fetch)
let user_input = document.getElementsByClassName('user-input');
for (const element of user_input) {
    element.addEventListener("submit", e => Client.respondToSubmit(e, document) );
}
