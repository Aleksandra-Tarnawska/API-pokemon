class PokemonTCGCatalog {
    constructor() {
        this.cards = []
        this.catalog = null;


        this.API = 'https://api.pokemontcg.io';
        this.API_VERSION = 'v2';
        this.API_RESOURCE = 'cards';

        this.API_ENDPOINT = `${this.API}/${this.API_VERSION}/${this.API_RESOURCE}`;

        this.UiSelectors = {
            content: '[data-content]'
        }
    }

    initializeCatalog() {  
        this.catalog = document.querySelector(this.UiSelectors.content);
        
        this.pullCards();
    }

    async pullCards() {
        const { data } = await this.fetchData(this.API_ENDPOINT);
 
        this.cards = [...data];

        this.createCatalog(this.cards);
        
        console.log(data);
    }

    async fetchData(url) {
        const response = await fetch(url);
        const parsedResponse = await response.json();

        return parsedResponse;
    }

    createCatalog(data) {
        this.catalog.innerHTML += [
            data.map((data) => this.createCard(data)).join(''),
        ];
    }
    createCard({name, number, images, supertype, subtypes, rarity}) {
        return `
        <article class="card">
            <header class="card__header">
                <h2 class="card__heading">
                    ${name}
                </h2>
                <p class="card__number">${number}</p>
            </header>
            <img class="card__image" src="${images.small}" alt="${name}"/>
            <p class="card__description">Supertype: ${supertype}</p>
            <p class="card__description">Subtype: ${subtypes}</p>
            <p class="card__description">Rarity: ${rarity}</p>
        </article>
        `
    }
}