console.log('Works')
require('./child.js')

if(module && module.hot) {
    console.log("Either the HotLoader")
    module.hot.accept()
}
