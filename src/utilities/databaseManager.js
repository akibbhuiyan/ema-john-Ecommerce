const getUser = () => {
    const existingUser = sessionStorage.getItem('userId');
    if (existingUser) {
        return existingUser;
    } else {
        const newUser = 'user-' + new Date().getTime();
        sessionStorage.setItem('userId', newUser)
        return newUser;
    }
}


const getDataKey = () => {
    const userId = getUser();
    return `emajohn/cart/${userId}`
}
//Push to localstorage
const getDatabaseCart = () => {
    const dataKey = getDataKey();
    const data = localStorage.getItem(dataKey) || "{}";
    return JSON.parse(data)
}
const addToDatabaseCart = (key, count) => {
    const currentCart = getDatabaseCart();
    currentCart[key] = count;
    localStorage.setItem(getDataKey(), JSON.stringify(currentCart));
}
const removeFromDatabaseCart = key => {
    const currentCart = getDatabaseCart();
    delete currentCart[key];
    localStorage.setItem(getDataKey(), JSON.stringify(currentCart));
}
const proccessOrder = (cart) => {
    localStorage.removeItem(getDataKey())
}
export { addToDatabaseCart, getDatabaseCart, removeFromDatabaseCart, proccessOrder }

//polly

const localStorage = window.localStorage || (() => {
    let store = {};
    return {
        getItem(key) {
            return store[key]
        },
        setItem(key, value) {
            store[key] = value.toString();
        },
        clear() {
            store = {}
        }
    };
})()
const sessionStorage = window.sessionStorage || (() => {
    let store = {};
    return {
        getItem(key) {
            return store[key]
        },
        setItem(key, value) {
            store[key] = value.toString();
        },
        clear() {
            store = {}
        }
    }
})()