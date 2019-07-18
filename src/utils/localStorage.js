
export default  {
    getItem(key) {
        return uni.getStorageSync(key)
    },
    setItem(key = '', value = '') {
        uni.setStorageSync(key, value);
    },
    save(key = '', value = '') {
        uni.setStorageSync(key, JSON.stringify(value));
    },
    fetch(key = null) {
        let data = uni.getStorageSync(key)
        return data ? JSON.parse(data) : ''
    },
    remove(key) {
        uni.removeStorageSync(key)
    },
    clearAll() {
        uni.clearStorage()
    }
}
