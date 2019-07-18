import api from './api'
import local from './localStorage'
import router from './router'
import {
    $toast,
    $message
} from './message'

export default {
    install: function (vm) {
        vm.prototype.$local = local
        vm.prototype.$api = api
        vm.prototype.$routing = router
        vm.prototype.$toast = $toast
        vm.prototype.$message = $message
    }
}
