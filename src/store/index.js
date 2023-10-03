import { createStore } from 'vuex'

const setInStorage = (data) => {
    localStorage.setItem(`quotes`, JSON.stringify(data));
}

export default createStore({
    state: {
        quotes: [
            {
                id: "c32d8b45-92fe-44f6-8b61-42c2107efe87",
                author: "Albert Einstein",
                category: "Physics",
                text: "Академическая карьера, требующая от человека публиковать в огромном количестве работы, создает угрозу интеллектуальной поверхностности",
                date: new Date(),
                modifiedDate: "",
            },
            {
                id: "c32d8b45-92fe-44f6-8b61-42c2107gfe87",
                author: "Albert Einstein",
                category: "Physics",
                text: "Все эти пятьдесят лет размышлений не приблизили меня к ответу на вопрос о том, что же это такое – кванты света",
                date: new Date(),
                modifiedDate: "",
            },
            {
                id: "c32d8b45-92fe-44f6-8b61-42c2107dfe87",
                author: "Albert Einstein",
                category: "Physics",
                text: "Всё относительно!",
                date: new Date(),
                modifiedDate: "",
            }
        ],
        filteredQuotes: null,
        quote: null,
        isEditing: false,
        alertSuccess: false
    },
    getters: {
        getAllData: state => state.quotes,
        getFilteredData: state => state.filteredQuotes
    },
    mutations: {
        addQuote(state, quote) {
            state.quotes.push(quote);
            setInStorage(state.quotes);
        },

        setQuotes(state, quotes) {
            state.quotes = quotes;
        },

        setFilteredQuotes(state, input = "") {
            state.filteredQuotes = state.quotes.filter(quote => quote.text.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
        },

        editQuote(state, id) {
            state.quote = state.quotes.find(quote => quote.id.toString() === id.toString());
        },

        isEditing(state, status) {
            state.isEditing = status;
        },

        saveQuote(state, quote) {
            state.quotes.forEach((item, index) => {
                if (item.id.toString() === quote.id.toString()) {
                    state.quotes.splice(index, 1);
                    state.quotes.push(quote);

                    return;
                }
            })

            setInStorage(state.quotes);
        },

        showSuccessAlert(state){
            state.alertSuccess = true;

            setTimeout(()=>{
                state.alertSuccess = false
            },2000)
        }
    },
    actions: {
        getData({ commit }) {
            const quotesFromStorage = JSON.parse(localStorage.getItem("quotes"));

            if (!quotesFromStorage) return;

            commit("setQuotes", quotesFromStorage);
        }
    },
})
